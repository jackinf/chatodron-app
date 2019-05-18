import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from "react-router";
import io from "socket.io-client";
import { Theme } from "@material-ui/core";
import { withRouter } from "react-router";
import withStyles, {StyledComponentProps, StyleRules} from "@material-ui/core/styles/withStyles";

import MessagesBox from './components/ChatWindow';
import { start } from './actions/getSingle';
import { getLastNMessages } from './actions/getLastNMessages';
import Centered from '../../components/Centered';
import { REDUCER_NAME__APP } from '../../reducer';
import { Config } from '../../types';
import RoomApi from "../../apis/RoomApi";
import scrollToBottomOfDiv from './helpers/scrollToBottomOfDiv';
import { messageContainerDiv } from './constants';
import { REDUCER_NAME__CHAT_ROOM } from './reducer';

interface RoomChatProps { start: Function, getLastNMessages: Function, loading: boolean, item?: any, config: Config }
export interface RoomChatState {
  messages: Array<any>,
  message: string,
  users: Array<string>,
}

type Props = RoomChatProps & RouteComponentProps<{ id: string }> & StyledComponentProps;
class ChatRoom extends Component<Props, RoomChatState> {
  state = {
    message: '',
    room: '',
    messages: [],
    users: [],
  };

  socket: SocketIOClient.Socket;
  constructor(props: Props) {
    super(props);

    this.socket = io(props.config.backendHost);
    this.socket.on('RECEIVE_MESSAGE', (data: any) => {
      this.setState({ messages: [...this.state.messages, data]});
      scrollToBottomOfDiv(messageContainerDiv);
    });
    this.socket.on('ROOM_PARTICIPANTS', ({ activeUsers }: { activeUsers: Array<string> }) => {
      console.log('activeSockets', activeUsers);
      this.setState({ users: Object.keys(activeUsers) });
    });
  }

  async componentDidMount() {
    await this.load();
  }

  componentWillUnmount() {
    if (this.props.item && this.props.item.name) {
      this.socket.emit('LEAVE_ROOM', { room: this.props.item.name });
    }
  }

  load = async () => {
    await this.props.start(this.props.match.params.id, (room: string) => {
      this.socket.emit('ENTER_ROOM', { room });

      // TODO: don't call api from here. Bring messages to the Redux state.
      RoomApi.getLastNMessages(room, 5)
        .then((messages: any[]) => this.setState({ messages: messages.reverse() }))
    });
  };

  sendMessage = (ev?: any) => {
    ev && ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      room: this.props.item.name,
      message: this.state.message
    });
    this.setState({ message: '' });
  };

  render() {
    const { loading, item } = this.props;
    const socketId = this.socket && this.socket.id;

    if (loading || !item || !socketId) {
      return <div>Loading</div>
    }

    return (
      <Centered>

        <h3>Active users: </h3>
        <div>
          {this.state.users && this.state.users.map((user: any, k: number) => <div key={k}>User {user}</div>)}
        </div>

        <MessagesBox
          message={this.state.message}
          messages={this.state.messages}
          onMessageChange={(e: any) => this.setState({ message: e.target.value })}
          onSendMessage={this.sendMessage}
          socketId={socketId}
        />
      </Centered>
    );
  }
}

function mapStateToProps(state: any) {
  const { loading, item } = state[REDUCER_NAME__CHAT_ROOM];
  const { config } = state[REDUCER_NAME__APP];
  return { loading, item, config };
}

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = { start, getLastNMessages };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles((theme: Theme): StyleRules => ({
  container: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
}))(withRouter(ChatRoom)));

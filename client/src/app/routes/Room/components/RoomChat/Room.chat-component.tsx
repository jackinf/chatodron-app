import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from "react-router";
import FormGroup from '@material-ui/core/FormGroup';
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import {TextField, Theme} from "@material-ui/core";
import {withRouter} from "react-router";
import withStyles, {StyledComponentProps, StyleRules} from "@material-ui/core/styles/withStyles";
import AlignListItems from './components/AlignListItems';
import MessagesBox from './components/MessagesBox';

import {
  start,
} from '../../actions/Room.get-single.actions';
import {
  getLastNMessages,
} from '../../actions/Room.get-last-n-messages.action';
import {REDUCER_NAME__ROOM} from "../../Room.reducer";
import Centered from '../../../../../components/Centered';
import { REDUCER_NAME__APP } from '../../../../App.reducer';
import { Config } from '../../../../App.types';
import RoomApi from "../../../../apis/Room.api";

function mapStateToProps(state: any) {
  const { loading, item } = state[REDUCER_NAME__ROOM];
  const { config } = state[REDUCER_NAME__APP];
  return { loading, item, config };
}
const mapDispatchToProps = { start, getLastNMessages };

interface RoomChatProps { start: Function, getLastNMessages: Function, loading: boolean, item?: any, config: Config }
export interface RoomChatState {
  messages: Array<any>,
  message: string,
  users: Array<string>,
}

type Props = RoomChatProps & RouteComponentProps<{ id: string }> & StyledComponentProps;
class RoomChat extends Component<Props, RoomChatState> {
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
    this.socket.on('RECEIVE_MESSAGE', (data: any) => this.addMessage(data));
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

  addMessage = (data: any) => {
    this.setState({ messages: [...this.state.messages, data]});
  };
  load = async () => {
    await this.props.start(this.props.match.params.id, (room: string) => {
      this.socket.emit('ENTER_ROOM', { room });

      // TODO: don't call api from here. Bring messages to the Redux state.
      RoomApi.getLastNMessages(room, 5)
        .then((messages: any[]) => this.setState({ messages: messages.reverse() }))
    });
  };
  sendMessage = (ev: any) => {    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      room: this.props.item.name,
      message: this.state.message
    });
    this.setState({ message: '' });
  };

  render() {
    const { loading, item, classes } = this.props;

    if (loading || !item) {
      return <div>Loading</div>
    }

    return (
      <Centered>
        {/*<AlignListItems />*/}
        <MessagesBox />

        <h3>Active users: </h3>
        <div>
          {this.state.users && this.state.users.map((user: any, k: number) => <div key={k}>User {user}</div>)}
        </div>
        <hr/>
        <div>
          <h3>Messages: </h3>
          {this.state.messages && this.state.messages.map((message: any, k: number) => {
            return (
              <div key={k}>{message.author}: {message.message}</div>
            )
          })}
        </div>

        <form className={classes && classes.container} noValidate autoComplete="off">
          <FormGroup row={false}>
            <TextField
              required
              id="outlined-required"
              label="Message"
              className={classes && classes.textField}
              margin="normal"
              onChange={e => this.setState({ message: e.target.value })}
              variant="outlined"
              value={this.state.message}
            />
          </FormGroup>

          <Button variant="outlined" color="primary" className={classes && classes.button} onClick={this.sendMessage}>
            Send
          </Button>
        </form>
      </Centered>
    );
  }
}

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
}))(withRouter(RoomChat)));

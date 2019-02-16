import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from "react-router";
import FormGroup from '@material-ui/core/FormGroup';

import {
  start,
} from './actions/Room.get-single.actions';
import {REDUCER_NAME__ROOM} from "./Room.reducer";
import {withRouter} from "react-router";
import withStyles, {StyledComponentProps, StyleRules} from "@material-ui/core/styles/withStyles";
import {TextField, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";

function mapStateToProps(state: any) {
  const { loading, item } = state[REDUCER_NAME__ROOM];
  return { loading, item };
}
const mapDispatchToProps = { start };

interface RoomChatProps { start: Function, loading: boolean, item?: any }
export interface RoomChatState {
  messages: Array<any>,
  message: string
}

class RoomChat extends Component<RoomChatProps & RouteComponentProps<{ id: string }> & StyledComponentProps, RoomChatState> {
  state = {
    message: '',
    room: '',
    messages: []
  };

  private socket: SocketIOClient.Socket;
  constructor(props: any) {
    super(props);

    this.socket = io('localhost:4000'); // TODO: replace localhost
    this.socket.on('RECEIVE_MESSAGE', (data: any) => this.addMessage(data));
  }

  async componentDidMount() {
    await this.load();
  }

  componentWillUnmount() {
    if (this.props.item && this.props.item.name) {
      this.socket.emit('LEAVE_ROOM', { room: this.props.item.name });
    }
  }

  addMessage = (data: any) => this.setState({ messages: [...this.state.messages, data]});
  load = async () => await this.props.start(this.props.match.params.id, (room: string) => {
    this.socket.emit('ENTER_ROOM', { room });
  });
  sendMessage = (ev: any) => {
    ev.preventDefault();
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
      <span>
        <div>
          {this.state.messages.map((message: any, k: number) => {
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
            label="Name"
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
      </span>
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

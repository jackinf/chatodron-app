import * as React from 'react';
import io from "socket.io-client";

import Centered from '../../../components/Centered';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const id = Math.random();

class Demo extends React.Component {
  state = {
    username: '',
    message: '',
    tempRoom: '',
    room: '',
    messages: []
  };

  setRoom = () => {
    this.setState({ room: this.state.tempRoom });
    this.socket.emit('ENTER_ROOM', {
      room: this.state.tempRoom,
    });
  };

  sendMessage = (ev: any) => {
    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      room: this.state.room,
      author: id,
      message: this.state.message
    });
    this.setState({message: ''});
  };
  socket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);

    const addMessage = (data: any) => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      console.log(this.state.messages);
    };

    this.socket = io('localhost:4000');
    this.socket.on('RECEIVE_MESSAGE', function(data: any){
      addMessage(data);
    });
  }

  componentWillUnmount(): void {
    if (this.state.room) {
      this.socket.emit('LEAVE_ROOM', {
        room: this.state.room,
      });
    }
  }

  render() {
    if (!this.state.room) {
      return (
        <Centered>
          <h2>Set room name:</h2>
          <TextField type="text" placeholder="Room" className="form-control"
                 value={this.state.tempRoom} onChange={ev => this.setState({tempRoom: ev.target.value})}/>
          <Button onClick={this.setRoom} className="btn btn-primary form-control">Send</Button>
        </Centered>
      )
    }

    return (
      <Centered>
        <h2>Chat room</h2>

        <div className="messages">
          {this.state.messages.map((message: any, k: number) => {
            return (
              <div key={k}>{message.author}: {message.message}</div>
            )
          })}
        </div>

        <input type="text" placeholder="Message" className="form-control"
               value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
        <Button onClick={this.sendMessage} className="btn btn-primary form-control">Send</Button>
      </Centered>
    );
  }
}

export default Demo;

import * as React from 'react';
import io from "socket.io-client";

const socket = io('localhost:4000');
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
    socket.emit('ENTER_ROOM', {
      room: this.state.tempRoom,
    });
  };

  sendMessage = (ev: any) => {
    ev.preventDefault();
    socket.emit('SEND_MESSAGE', {
      room: this.state.room,
      author: id,
      message: this.state.message
    });
    this.setState({message: ''});
  };

  constructor(props: any) {
    super(props);

    const addMessage = (data: any) => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      console.log(this.state.messages);
    };

    socket.on('RECEIVE_MESSAGE', function(data: any){
      addMessage(data);
    });
  }

  render() {
    if (!this.state.room) {
      return (
        <div>
          Set room name:
          <input type="text" placeholder="Room" className="form-control"
                 value={this.state.tempRoom} onChange={ev => this.setState({tempRoom: ev.target.value})}/>
          <button onClick={this.setRoom} className="btn btn-primary form-control">Send</button>
        </div>
      )
    }

    return (
      <div>
        Chat room

        <div className="messages">
          {this.state.messages.map((message: any, k: number) => {
            return (
              <div key={k}>{message.author}: {message.message}</div>
            )
          })}
        </div>


        <input type="text" placeholder="Message" className="form-control"
               value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>

      </div>
    );
  }
}

export default Demo;

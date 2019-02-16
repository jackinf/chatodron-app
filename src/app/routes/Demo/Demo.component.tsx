import * as React from 'react';
import io from "socket.io-client";

const socket = io('localhost:4000');
const id = Math.random();

class Demo extends React.Component {
  state = {
    username: '',
    message: '',
    messages: []
  };

  sendMessage = (ev: any) => {
    ev.preventDefault();
    socket.emit('SEND_MESSAGE', {
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

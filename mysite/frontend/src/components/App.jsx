import React, { Component } from 'react';
import { render } from 'react-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const roomName = location.pathname.substr(1);

    const socketPath = `ws://${
      window.location.host
    }/ws/${
      roomName}`;

    const chatSocket = new WebSocket(
      socketPath,
    );


    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const message = { text: data.message, date: data.utc_time };
      message.date = moment(message.date).local().format('YYYY-MM-DD HH:mm:ss');

      this.setState((prevState) => ({ messages: prevState.messages.concat(message) }));
    };

    document.querySelector('#chat-message-input').focus();

    document.querySelector('#chat-message-submit').onclick = () => {
      const messageInputDom = document.querySelector('#chat-message-input');
      const message = messageInputDom.value;

      chatSocket.send(JSON.stringify({
        message,
      }));
      messageInputDom.value = '';
    };
  }

  render() {
    return (
      <div>
        {this.state.messages.map((item) => (
          <div key={item.id} id="message" className="card">
            <div className="cell large-4">
              {item.text}
            </div>
            <div className="cell large-2 text-right"><small>{item.date}</small></div>
          </div>
        ))}
        <textarea id="chat-message-input" type="text" cols="100" />
        <br />
        <input id="chat-message-submit" type="button" className="button" value="Send" />

      </div>
    );
  }
}


export default App;

const container = document.getElementById('app');
render(<App />, container);

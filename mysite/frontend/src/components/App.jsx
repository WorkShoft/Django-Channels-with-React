import React, { Component } from 'react';
import { render } from 'react-dom';
import MessageInput from './MessageInput';
import Message from './Message';


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

    //document.querySelector('#chat-message-input').focus();

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
    const { messages } = this.state;

    const messageInput = <MessageInput />;
    const messageList = (
      <div>
        {messages.map((item) => (
          <div key={item.id}>
            <Message key={item.id} text={item.text} date={item.date} />
          </div>
        ))}
      </div>
    );

    return (
      <div>
        {messageList}
        {messageInput}
      </div>
    );
  }
}


export default App;

const container = document.getElementById('app');
render(<App />, container);

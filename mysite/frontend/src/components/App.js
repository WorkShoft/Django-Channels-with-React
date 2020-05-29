import React, { Component } from "react";
import { render } from "react-dom";


class App extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    messages: [],
	};
    }

    
    componentDidMount(){
        const roomName = location.pathname.substr(1);

        var socketPath = 'ws://'
            + window.location.host
            + '/ws/'
            + roomName;
        
        const chatSocket = new WebSocket(
	    socketPath
        );
        
        chatSocket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            var message = {text: data.message, date: data.utc_time};
	    message.date = moment(message.date).local().format('YYYY-MM-DD HH:mm:ss');
	    
            let updated_messages = [...this.state.messages];
            updated_messages.push(message);
            this.setState({messages: updated_messages});
        };

	chatSocket.onclose = (e) => {
	    console.error('Chat socket closed unexpectedly');
	};

	document.querySelector('#chat-message-input').focus();
	document.querySelector('#chat-message-input').onkeyup = (e) => {
	    this.clickSubmitMessage
	};

	document.querySelector('#chat-message-submit').onclick = (e) => {
            var messageInputDom = document.querySelector('#chat-message-input');
            var message = messageInputDom.value;

            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInputDom.value = '';
	};
    }

    render() {
	return (
            <div>
              
              {this.state.messages.map(function(item, i){
                  return <div key={i} id="message" className="card">

                           <div className="cell large-4">{item.text}</div>
                           <div className="cell large-2 text-right"><small>{item.date}</small></div>
                         </div>
                  ;}
                                      )}
                                           

	    <textarea id="chat-message-input" type="text" cols="100" /><br />
	    <input id="chat-message-submit" type="button" className="button" value="Send" />
	    
            </div>
	);
    }
}


export default App;

const container = document.getElementById("app");
render(<App />, container);

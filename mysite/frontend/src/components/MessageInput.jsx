import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';


function MessageInput(props) {
  const messageInput = useRef(null);
  const { socket } = props;

  function focusInput() {
    messageInput.current.focus();
  }

  function resetInput() {
    messageInput.current.value = '';
  }

  function sendMessage() {
    const message = messageInput.current.value;
    socket.send(JSON.stringify({
      message,
    }));
  }

  function handleSubmission() {
    sendMessage();
    resetInput();
  }

  useEffect(() => {
    focusInput();
  });

  return (
    <div>
      <textarea id="chat-message-input" type="text" cols="100" ref={messageInput} />
      <br />
      <input id="chat-message-submit" type="button" className="button" value="Send" onClick={handleSubmission} />
    </div>
  );
}

MessageInput.propTypes = {
  socket: PropTypes.instanceOf(WebSocket).isRequired,
};


export default MessageInput;

import React, { useRef } from 'react';


function MessageInput() {
  return (
    <div>
      <textarea id="chat-message-input" type="text" cols="100" />
      <br />
      <input id="chat-message-submit" type="button" className="button" value="Send" />
    </div>
  );
}


export default MessageInput;

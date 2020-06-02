import React from 'react';


const Message = (id, text, date) => (
  <div key={id} id="message" className="card">
    <div className="cell large-4">
      { text }
    </div>
    <div className="cell large-2 text-right"><small>{date}</small></div>
  </div>
);


export default Message;

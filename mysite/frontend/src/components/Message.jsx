import React from 'react';


function Message({ text, date }) {
  return (
    <div>
      <div className="cell large-4">
        { text }
      </div>
      <div className="cell large-2 text-right"><small>{date}</small></div>
    </div>
  );
}

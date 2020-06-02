import React from 'react';
import PropTypes from 'prop-types';


function Message(props) {
  const { text, date } = props;
  return (
    <div id="message" className="card">
      <div className="cell large-4">
        {text}
      </div>
      <div className="cell large-2 text-right"><small>{date}</small></div>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Message;

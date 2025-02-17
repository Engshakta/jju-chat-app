// components/MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.length === 0 ? (
        <p>No messages yet!</p>
      ) : (
        <div>
          {messages.map((msg, index) => (
            <div key={index} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
              <strong>{msg.sender}: </strong>{msg.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;

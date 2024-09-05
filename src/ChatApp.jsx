/* eslint-disable no-unused-vars */
// src/ChatApp.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('delete message', (msgId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== msgId)
      );
    });

    return () => {
      socket.off('chat message');
      socket.off('delete message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msgObj = { id: Date.now(), text: message };
      socket.emit('chat message', msgObj);
      setMessage('');
    }
  };

  const deleteMessage = (msgId) => {
    socket.emit('delete message', msgId);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg")' }}
    >
      <div
        className="w-full max-w-md rounded-lg shadow-md p-4 backdrop-blur-lg border-2 border-white bg-opacity-80"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
      >
        <div className="mb-4 h-64 overflow-y-scroll border-b">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="mb-2 flex items-center justify-between text-gray-800"
            >
              <span className="flex-1 bg-transparent">{msg.text}</span>
              <button
                onClick={() => deleteMessage(msg.id)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

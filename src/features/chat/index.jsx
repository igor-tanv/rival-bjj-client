import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import useWebsocket from './use-websocket';
import { apiFetch } from "../../modules/api-fetch"
import Button from "../../ui/button"
import './styles.css';

function Chat({ match }) {
  const {
    socket,
    reconnecting,
    messages,
    setMessages,
  } = useWebsocket({
    url: process.env.REACT_APP_WEBSOCKET_HOST,
    onConnected,
  });

  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState({});

  const playerId = localStorage.getItem("playerId");

  const recipientId = match.params.recipient;

  useEffect(() => {
    apiFetch(`players/${recipientId}`)
      .then((json) => {
        setRecipient(json.player)
      });
    apiFetch(`chats/${recipientId}/${playerId}`)
      .then((json) =>
        setMessages(
          json.map((message) => {
            return {
              type: 'say',
              ...message,
            };
          }),
        ),
      );
  }, []);

  function onConnected(socket) {
    socket.send(
      JSON.stringify({
        type: 'connect',
        playerId: playerId,
      }),
    );
  }

  // check for empty text fields
  function sendMessage(e) {
    e.preventDefault();
    socket.send(
      JSON.stringify({
        type: 'say',
        sender: playerId,
        recipient: recipientId,
        text: message,
      }),
    );
    setMessage('');
  }

  function validMessage(m) {
    return m.trim().length === 0 ? true : false
  }

  return reconnecting ? (
    <div>reconnecting!</div>
  ) : (
      <form onSubmit={sendMessage}>
        <div className='chat'>
          <div className='inner'>
            {messages
              .filter((m) => m.type === 'say')
              .map((m, i) => (
                <div key={i} className='message'>
                  {m.sender === playerId ? 'You' : recipient.firstName}:{' '}
                  {m.text}
                </div>
              ))}
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type='submit' disabled={validMessage(message)}>Send</Button>
          </div>
        </div>
        {recipient && <div>Chatting with {recipient.firstName}</div>}
      </form>
    );
}

export default withRouter(Chat);
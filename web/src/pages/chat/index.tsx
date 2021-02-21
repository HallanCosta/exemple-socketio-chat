import React, { useEffect, useState, FormEvent } from 'react';
import { socket } from '../../services/socket';

import './styles.css';

type ChatProps = {
  username: string;
  message: string;
}

export const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receivedMessage', (message: ChatProps) => {
      renderMessage(message);
    });

    socket.on('previousMessages', (messages: Array<ChatProps>) => {
      for (const message of messages) 
        renderMessage(message);
    });
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      username,
      message
    };

    renderMessage(data);
    socket.emit('sendMessage', data);
  }

  function renderMessage({ username, message }: ChatProps) {
    const divMessage = document.querySelector('.messages') as HTMLDivElement;

    const div = document.createElement('div');
    div.classList.add('message');
    const textUsername = document.createTextNode(`${username}: `);
    const textMessage = document.createTextNode(message);
    const strong = document.createElement('strong');
    strong.append(textUsername);
    div.append(strong);
    div.append(textMessage);

    divMessage.append(div);
  }

  return (
    <form id="chat" onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="username" 
        placeholder="Digite seu úsuario"
        minLength={3}
        onChange={e => setUsername(e.target.value)}
      />
      <div className="messages"></div>
      <input 
        type="text" 
        name="message" 
        placeholder="Digite sua mensagem"
        minLength={1}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
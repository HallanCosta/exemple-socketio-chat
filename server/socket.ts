import { Socket, Server } from 'socket.io';

import { app } from './app';

type ChatProps = {
  username: string;
  message: string;
}

export const SocketIO = function () {
  const io: Server = require('socket.io')(app, {
    cors: {
      origin: '*',
      credentials: false
    }
  });

  let messages: Array<ChatProps> = [];

  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', (data: ChatProps) => {
      messages.push(data);
      socket.broadcast.emit('receivedMessage', data);
    });
  });
}

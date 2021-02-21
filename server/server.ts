import { createServer, IncomingMessage, ServerResponse  } from 'http';
import { Socket, Server } from 'socket.io';

type ChatProps = {
  username: string;
  message: string;
}

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  });

  response.end('hey there!!');
}).listen(3333);
console.log("> Listening on port 3333");


const io: Server = require('socket.io')(server, {
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

import { createServer, IncomingMessage, ServerResponse } from 'http';

export const app = createServer((request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  });

  response.end('hey there!!');
})

console.log("> Listening on port 3333");
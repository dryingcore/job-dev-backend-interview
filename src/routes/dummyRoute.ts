import { IncomingMessage, ServerResponse } from 'http';

export const getDummyRoute = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
};

import http, { IncomingMessage, ServerResponse } from 'http';
import Server from '../server/Server';
import requestLogger from '../utils/requestLogger';

// Mock do requestLogger
jest.mock('@/utils/requestLogger');

describe('Server Class', () => {
  let server: Server;

  beforeEach(() => {
    server = new Server(8080); // Instancia a classe
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should start the server', done => {
    const listenSpy = jest.spyOn(http.Server.prototype, 'listen').mockImplementation((port, callback) => {
      if (callback) callback();
      return server as unknown as http.Server;
    });

    server.start();
    expect(listenSpy).toHaveBeenCalledWith(8080, expect.any(Function));
    done();
  });

  it('should add and handle a route', done => {
    const req = { url: '/' } as IncomingMessage;
    const res = {
      statusCode: 0,
      setHeader: jest.fn(),
      end: jest.fn((message: string) => {
        expect(res.statusCode).toBe(200);
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
        expect(message).toBe('Hello, World!');
        done();
      }),
    } as unknown as ServerResponse;

    server.addRoute('/', (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, World!');
    });

    (server as any).handleRequest(req, res); // Chama diretamente o handler privado
  });

  it('should return 404 for unknown routes', done => {
    const req = { url: '/unknown' } as IncomingMessage;
    const res = {
      statusCode: 0,
      setHeader: jest.fn(),
      end: jest.fn((message: string) => {
        expect(res.statusCode).toBe(404);
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
        expect(message).toBe('Not Found');
        done();
      }),
    } as unknown as ServerResponse;

    (server as any).handleRequest(req, res); // Chama diretamente o handler privado
  });

  it('should call the requestLogger middleware', done => {
    const req = { url: '/' } as IncomingMessage;
    const res = {
      statusCode: 0,
      setHeader: jest.fn(),
      end: jest.fn(() => {
        expect(requestLogger).toHaveBeenCalledWith(req);
        done();
      }),
    } as unknown as ServerResponse;

    server.addRoute('/', (req, res) => {
      res.statusCode = 200;
      res.end();
    });

    server.testHandleRequest(req, res);
  });
});

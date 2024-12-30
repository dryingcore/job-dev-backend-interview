import requestLogger from '@/utils/requestLogger';
import http, { IncomingMessage, ServerResponse } from 'http';

export default class Server {
  private server: http.Server;
  private routes: { [key: string]: (req: IncomingMessage, res: ServerResponse) => void } = {};

  /**
   * @description
   * cria o servidor, essa classe foi criada para facilitar o desenvolvimento da API ja que nao vamos usar frameworks
   *
   * @param port porta do servidor
   */
  constructor(private port: number) {
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse): void {
    // chama o middleware para registrar as requisições HTTP no console
    requestLogger(req);

    const handler = this.routes[req.url || ''];

    if (handler) handler(req, res);
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
    }
  }

  // metodo para adicionar rotas
  public addRoute(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
    this.routes[path] = handler;
  }

  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

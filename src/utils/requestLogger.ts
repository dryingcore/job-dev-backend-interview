import { IncomingMessage } from 'http';

/**
 * @description
 * Middleware para registrar as requisições HTTP no console.
 * Apenas para testes de desenvolvimento e debug rsrs =).
 */
export default function requestLogger(req: IncomingMessage): void {
  console.log('-------------------------------------------');
  console.log(`Headers ---> ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`Method ---> ${req.method}`);
  console.log(`Requested URL ---> ${req.url}`);
  console.log('-------------------------------------------');
}

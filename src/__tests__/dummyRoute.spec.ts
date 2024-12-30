import { getDummyRoute } from '../routes/dummyRoute';
import { IncomingMessage, ServerResponse } from 'http';

describe('Get Dummy Route', () => {
  it('Should return Hello World!', () => {
    // mockando req e res
    const req = {} as IncomingMessage;
    const res = {
      statusCode: 0,
      setHeader: jest.fn(),
      end: jest.fn(),
    } as unknown as ServerResponse;

    // chamando a funcao
    getDummyRoute(req, res);

    // verificando se o status code foi 200
    expect(res.statusCode).toBe(200);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Hello World!');
  });
});

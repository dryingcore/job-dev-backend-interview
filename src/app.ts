import Server from './server/Server';
import Database from './database/databaseConfig';
import { getDummyRoute } from './routes/dummyRoute';

/**.
 * Realiza as seguintes tarefas:
 * 1. Conecta-se ao banco de dados.
 * 2. Executa uma consulta SQL (SELECT * FROM produtos).
 * 3. Exibe os resultados da consulta.
 * 4. Cria uma instancia do servidor com a porta 8080.
 * 5. Adiciona a rota "/" com o handler getDummyRoute.
 * 6. Inicia o servidor.
 *
 * Caso haja algum erro, o programa trata-o e exibe uma mensagem de erro.
 * Caso contrario, o programa fecha a conexao com o banco de dados.
 */
async function main() {
  const db = new Database();
  const app = new Server(8080);

  try {
    await db.connect(); // Conecta ao banco
    const result = await db.query('SELECT * FROM produtos'); // Executa consulta
    console.log('Resultados:', result.rows); // Exibe o resultado

    app.addRoute('/', getDummyRoute);
    app.start();
  } catch (error) {
    console.error('Erro:', error); // Tratar erros
  } finally {
    await db.disconnect(); // Desconecta do banco
  }
}

main();

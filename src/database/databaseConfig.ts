import ExposeEnvironmentVariables from '../utils/exposeEnvironmentVariables';
import { Client } from 'pg';

export default class Database {
  private client: Client;

  constructor() {
    // Cria uma instância de ExposeEnvironmentVariables
    const env = new ExposeEnvironmentVariables();

    // Acessa as variáveis de ambiente corretamente usando o método get
    this.client = new Client({
      host: env.get('DB_HOST') as string,
      port: env.get('DB_PORT', true) as number,
      user: env.get('DB_USER') as string,
      password: env.get('DB_PASSWORD') as string,
      database: env.get('DB_NAME') as string,
    });
  }

  /**
   * Conecta ao banco de dados.
   */
  public async connect(): Promise<void> {
    try {
      console.log('Tentando conectar ao banco de dados...');
      await this.client.connect();
      console.log('Conectado ao banco de dados.');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      throw error;
    }
  }

  /**
   * Executa uma consulta SQL no banco de dados.
   * @param query Consulta SQL a ser executada.
   * @returns Resultado da consulta.
   */
  public async query(query: string): Promise<any> {
    try {
      const result = await this.client.query(query);
      return { rows: result.rows };
    } catch (error) {
      console.error('Erro ao executar consulta SQL:', error);
      throw error;
    }
  }

  /**
   * Fecha a conexão com o banco de dados.
   */
  public async disconnect(): Promise<void> {
    try {
      await this.client.end();
      console.log('Conexão com o banco de dados encerrada.');
    } catch (error) {
      console.error('Erro ao encerrar a conexão com o banco de dados:', error);
      throw error;
    }
  }

  /**
   * Obtém o cliente do banco de dados para executar consultas.
   * @returns Instância do cliente do banco de dados.
   */
  public getClient(): Client {
    return this.client;
  }
}

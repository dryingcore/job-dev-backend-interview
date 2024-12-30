import { config as configDotenv } from 'dotenv';

export default class ExposeEnvironmentVariables {
  // Carrega as variáveis de ambiente no momento da inicialização
  constructor() {
    this.loadEnvVariables();
  }

  /**
   * Carrega as variáveis de ambiente usando dotenv.
   */
  private loadEnvVariables(): void {
    const result = configDotenv();
    if (result.error) {
      console.error('Erro ao carregar variáveis de ambiente:', result.error);
    } else {
      console.log('Variáveis de ambiente carregadas com sucesso.');
    }
  }

  /**
   * Obtém o valor de uma variável de ambiente.
   * @param key Nome da variável de ambiente.
   * @returns Valor da variável ou undefined caso não exista.
   */
  public get(key: string, shouldBeNumber = false): string | number | undefined {
    const value = process.env[key];

    if (shouldBeNumber) {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        throw new Error(`The environment variable ${key} is not a valid number.`);
      }
      return numericValue;
    }

    return value;
  }

  /**
   * Obtém todas as variáveis de ambiente carregadas.
   * @returns Um objeto contendo todas as variáveis de ambiente.
   */
  public getAll(): NodeJS.ProcessEnv {
    return process.env;
  }

  /**
   * Define ou substitui uma variável de ambiente em tempo de execução.
   * @param key Nome da variável de ambiente.
   * @param value Valor a ser atribuído.
   */
  public set(key: string, value: string): void {
    process.env[key] = value;
  }
}

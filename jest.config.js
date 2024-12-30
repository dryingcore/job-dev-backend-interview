/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'], // Se usar paths no tsconfig
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforma arquivos TypeScript para testes
  },
};

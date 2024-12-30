/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'], // para resolver caminhos relativos
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // transforma arquivos TypeScript
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // resolve os caminhos com "@"
  },
};

module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  rootDir: '.',
  testRegex: '.test.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  coverageReporters: [
    'text',
    'cobertura'
  ],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['./sample', 'jest.config.js'],
};

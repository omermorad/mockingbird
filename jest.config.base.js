module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    'dist',
    'node_modules',
    'jest.config.js',
  ],
  coverageReporters: [
    'text',
    'cobertura',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  modulePathIgnorePatterns: ['./sample'],
  verbose: true,
  setupFiles: [
    'jest-gherkin',
  ],
};

const base = require('./jest.config.base');

module.exports = {
  ...base,
  roots: ['<rootDir>'],
  projects: ['<rootDir>/packages/generator', '<rootDir>/packages/reflect', '<rootDir>/packages/parser'],
};

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: ['.*\\.spec\\.ts$'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: path.join(__dirname, 'coverage'),
  coverageReporters: ['text', 'cobertura', 'html', 'lcov'],
  reporters: ['default'],
  testEnvironment: 'node',
  testTimeout: 60000,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname,
  }),
};

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  moduleFileExtensions: ['.ts', '.tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  verbose: true,
};

export default config;

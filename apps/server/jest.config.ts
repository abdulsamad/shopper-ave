import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  verbose: true,
};

export default config;

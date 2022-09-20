import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testEnvironment: 'node',
  verbose: true,
  rootDir: 'src',
  moduleNameMapper: {
    '@config/(.*)': ['<rootDir>/config/$1'],
    '@controllers/(.*)': ['<rootDir>/controllers/$1'],
    '@middlewares/(.*)': ['<rootDir>/middlewares/$1'],
    '@models/(.*)': ['<rootDir>/models/$1'],
    '@routes/(.*)': ['<rootDir>/routes/$1'],
    '@seeds/(.*)': ['<rootDir>/seeds/$1'],
    '@utils/(.*)': ['<rootDir>/utils/$1'],
  },
};

export default config;

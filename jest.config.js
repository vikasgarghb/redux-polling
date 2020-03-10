module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['TS2322', 'TS2339', 'TS2609'],
      },
      isolatedModules: true,
    },
  },
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(tsx|ts)?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '/src/.*spec\\.(ts|tsx)$',
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*spec.(ts|tsx)',
    '!src/**/**/*spec.(ts|tsx)',
    '!src/store/*.(ts|tsx)',
    '!src/mocks/*.(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  setupFiles: ['<rootDir>/config/enzyme/enzyme.setup.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: ['/node_modules/(?!styled-icons).+\\.js$'],
  modulePathIgnorePatterns: ['.*__mocks__.*'],
};

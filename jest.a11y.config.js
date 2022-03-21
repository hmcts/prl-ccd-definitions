module.exports = {
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
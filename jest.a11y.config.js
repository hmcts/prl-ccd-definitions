module.exports = {
  testRegex: '(/test/a11y.*)$',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  transform: { '^.+\\.ts$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'js', 'json']
};
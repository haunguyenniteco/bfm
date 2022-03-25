module.exports = {
  testRegex: '(/(tests|__tests__)/.*.(test|spec)).(js?|jsx?|tsx?)$',
  moduleDirectories: ['node_modules', 'src', 'utils'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['(tests/.*.mock).(js?|jsx?|tsx?)$'],
  testResultsProcessor: 'jest-sonar-reporter',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
}

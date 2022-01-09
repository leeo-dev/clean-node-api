module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/**.js'],
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig']
}

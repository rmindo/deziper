const nextJest = require('next/jest')

const config = nextJest({
  dir: './'
})

module.exports = config({
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    'node_modules',
    '<rootDir>/'
  ],
})
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.ts$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'typescript' },
        target: 'es2022'
      }
    }]
  },
  // Mirror the `~/*` path alias from tsconfig.json.
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  }
}

/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'ecmascript', jsx: true },
        transform: { react: { runtime: 'automatic' } }
      }
    }]
  },
  // Jest can't load the CSS and asset files that Vite normally handles, so replace them with stubs.
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test/styleMock.cjs',
    '\\.(svg|png|jpe?g|gif|webp|ico)$': '<rootDir>/test/fileMock.cjs'
  }
}

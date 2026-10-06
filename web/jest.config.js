/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'typescript', tsx: true },
        transform: { react: { runtime: 'automatic' } }
      }
    }]
  },
  moduleNameMapper: {
    // Mirror the `~/*` path alias from tsconfig.app.json.
    '^~/(.*)$': '<rootDir>/src/$1',
    // Jest can't load the CSS and asset files that Vite normally handles, so replace them with stubs.
    '\\.(css|less|scss|sass)$': '<rootDir>/test/styleMock.cjs',
    '\\.(svg|png|jpe?g|gif|webp|ico)$': '<rootDir>/test/fileMock.cjs'
  }
}

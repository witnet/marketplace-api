// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: "./test/coverage",
    // A preset that is used as a base for Jest's configuration
    preset: "ts-jest",
    // Automatically reset mock state between every test
    resetMocks: true,
    // Reset the module registry before running each individual test
    resetModules: true,
    testEnvironment: "node",
    // The glob patterns Jest uses to detect test files
    // testMatch: [
    //   "**/__tests__/**/*.[jt]s?(x)",
    //   "**/?(*.)+(spec|test).[tj]s?(x)"
    // ],
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    // testPathIgnorePatterns: [
    //   "/node_modules/"
    // ],
  
    // Whether to use watchman for file crawling
    // watchman: true,
  };
// jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript
    testEnvironment: 'jsdom', // Use jsdom for testing React components
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom', // Ensure this is set to jsdom
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform .ts and .tsx files
      '^.+\\.jsx?$': 'babel-jest', // Transform .js and .jsx files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handle CSS imports
    },
  };

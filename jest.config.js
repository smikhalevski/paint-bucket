module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['/lib/'],
  moduleNameMapper: {
    '^paint-bucket$': __dirname + '/packages/paint-bucket/src/main',
    '^@paint-bucket/(.*)$': __dirname + '/packages/$1/src/main',
  },
};

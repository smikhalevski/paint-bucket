const path = require('path');

module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  moduleNameMapper: {
    '^paint-bucket$': path.resolve(__dirname, './packages/paint-bucket'),
    '^@paint-bucket/(.*)$': path.resolve(__dirname, './packages/$1/src/main'),
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [
          151001,
        ],
      },
    },
  },
};

/* eslint-disable no-undef */
/* eslint-env node */
module.exports = {
    testEnvironment: 'jsdom',
    roots: [
        "<rootDir>/src"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    "moduleNameMapper": {
        "\\.(jpg|ico|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
};

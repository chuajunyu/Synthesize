/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",

    moduleNameMapper: {
      '^.+\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
      "^@/(.*)$": "<rootDir>/$1",
    },

    preset: 'ts-jest',
    testEnvironment: "jsdom",
};

module.exports = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: [
    '/node_modules/(?!(firebase|@firebase)/)',
  ]
})
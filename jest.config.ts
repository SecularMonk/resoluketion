import type { Config } from "jest";

const config: Config = {
   verbose: true,
   preset: "ts-jest",
   transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
   },
   testMatch: ["**/*.test.ts?(x)"],
};

export default config;

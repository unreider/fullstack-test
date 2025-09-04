{
  "preset": "ts-jest",
  "testEnvironment": "node",
  "roots": ["<rootDir>/src"],
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "transform": {
    "^.+\\.tsx?$": ["ts-jest", { "useESM": true }]
  },
  "extensionsToTreatAsEsm": [".ts"],
  "globals": {
    "ts-jest": {
      "tsconfig": "tsconfig.json"
    }
  }
}

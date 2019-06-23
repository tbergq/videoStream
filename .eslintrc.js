const OFF = 0;
const WARN = 1;
const ERROR = 2;
 
module.exports = {
  root: true,
 
  extends: ['@kiwicom/eslint-config'],
 
  // adjust the rules as needed
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    jest: true,
    node: true,
    es6: true,
    browser: true,
  },
  rules: {
    eqeqeq: [ERROR, 'smart'],
  },
  globals: {
    chrome: 'readonly',
    cast: 'readonly'
  }
};

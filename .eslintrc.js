module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    camelcase: 'off',
    'no-await-in-loop': 'off',
    'import/no-cycle': 'off',
  },
};

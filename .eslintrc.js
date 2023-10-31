module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'comma-dangle': 'off',
    semi: 'error',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'import/no-cycle': 'off',
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
    'unused-imports/no-unused-imports': 'error',
    'react/require-default-props': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': [
      0,
      {
        html: 'ignore',
        custom: 'ignore',
        explicitSpread: 'ignore',
        exceptions: [],
      },
    ],
  },
};

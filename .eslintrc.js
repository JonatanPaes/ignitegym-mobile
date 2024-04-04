module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^native-base', '^@?\\w'],

          ['^@screens'],
          ['^@components'],
          ['^@hooks'],
          ['^@store'],
          ['^@storage'],
          ['^@routes'],
          ['^@utils'],

          ['^\\.+'],

          [
            '^.+\\.css$',
            '^.+\\.(s(c|a)ss)$',
            '^.+\\.less$',
            '^.+\\.styl$',
            '^.+\\.theme$'
          ]
        ]
      }
    ],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-var-requires': 'off'
  }
}

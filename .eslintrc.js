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
          ['^@services'],
          ['^@hooks'],
          ['^@contexts'],
          ['^@store'],
          ['^@storage'],
          ['^@routes'],
          ['^@assets'],
          ['^@dtos'],
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

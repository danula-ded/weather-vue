import vue from 'eslint-plugin-vue'
import ts from '@typescript-eslint/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        project: null,
        parser: parserTs,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      vue,
      '@typescript-eslint': ts,
    },
    rules: {
      ...vue.configs['flat/recommended'].rules,
      ...ts.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
    },
  },
]

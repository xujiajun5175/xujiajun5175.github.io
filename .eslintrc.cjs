/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-30 13:01:58
 * @LastEditTime: 2024-10-30 13:02:14
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/.eslintrc.cjs
 */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:astro/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    }
  ]
}

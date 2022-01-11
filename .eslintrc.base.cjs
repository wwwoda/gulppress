module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
  globals: {
    NodeJS: true,
  },
  extends: "eslint-config-woda/typescript",
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		ecmaVersion: 2018,
		sourceType: "module",
    extraFileExtensions: ['.cjs'],
	},
	plugins: [
    "@typescript-eslint",
	],
	rules: {
    'func-names': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
   ],
		'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
	},
};

module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
    'airbnb-typescript/base',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: [
    '@typescript-eslint',
	],
	rules: {
    'import/prefer-default-export': 'off',
    'max-len': ['error', { 'code': 100, 'ignoreComments': true }],
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': ['error', {'functions': false}],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
	},
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
};

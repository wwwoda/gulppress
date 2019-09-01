module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es6': true,
		'node': true,
	},
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'project': './tsconfig.json',
	},
	'plugins': [
		'@typescript-eslint',
	],
	'extends': [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
		// 'wordpress',
	],
	'rules': {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'comma-dangle': ['error', 'always-multiline'],
	},
};

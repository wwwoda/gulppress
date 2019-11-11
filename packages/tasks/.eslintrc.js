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
    'airbnb-typescript/base',
    "plugin:@typescript-eslint/recommended",
	],
	'rules': {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
	},
};

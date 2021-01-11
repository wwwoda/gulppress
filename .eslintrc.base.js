module.exports = {
	extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb-typescript/base',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
    '@typescript-eslint',
	],
	rules: {
		'import/named': 'off',
		'import/no-cycle': 'off',
		'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies' : 'off',
		'import/prefer-default-export': 'off',
    'max-len': ['error', { 'code': 100, 'ignoreComments': true }],
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': ['error', {'functions': false}],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {'functions': false}],
	},
};

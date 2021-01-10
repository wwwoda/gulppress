module.exports = {
	extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb-typescript/base',
    "plugin:@typescript-eslint/recommended",
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	plugins: [
    '@typescript-eslint',
	],
	rules: {
		'import/named': 'off',
		'import/no-cycle': 'off',
		'import/no-dynamic-require': 'off',
		'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    // "sort-imports": ["error", {
    //   "ignoreCase": false,
    //   "ignoreDeclarationSort": false,
    //   "ignoreMemberSort": false,
    //   "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
    // }],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				directory: __dirname,
			},
		},
	},
};

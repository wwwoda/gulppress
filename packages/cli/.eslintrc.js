module.exports = {
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	settings: {
		'import/resolver': {
			typescript: {
				directory: __dirname,
			},
		},
	},
	rules: {
		'no-console': 'off',
	},
};

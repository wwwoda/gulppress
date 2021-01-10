module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb-typescript/base',
	],
	plugins: [
		'@typescript-eslint',
	],
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		ecmaVersion: 2018,
		sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
	rules: {
		'class-methods-use-this': 'off',
		'import/no-dynamic-require': 'off',
		'import/prefer-default-export': 'off',
		'no-console': 'off',
    'no-restricted-syntax': 'off',
    "sort-imports": ["error", {
      "ignoreCase": false,
      "ignoreDeclarationSort": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
      "allowSeparatedGroups": false
    }],
  }
};

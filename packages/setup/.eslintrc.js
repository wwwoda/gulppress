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
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module'
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
	// settings: {
	// 	'import/resolver': {
	// 		typescript: {
	// 			directory: __dirname,
	// 		},
	// 	},
	// },
	rules: {
		'no-console': 'off',
    'no-restricted-syntax': 'off'
  }
};

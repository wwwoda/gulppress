module.exports = {
  extends: '../../.eslintrc.base.cjs',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-redeclare': 'off',
  }
};

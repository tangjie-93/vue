module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
      // allow async-await
      'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {
        'x-invalid-end-tag': false
    }],
    'no-undef': 'off',
    'camelcase': 'off',
    'indent': ['error', 4, { 'SwitchCase': 1 }],   // 空格4个  
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'indent': ["off", "tab"],
    'no-trailing-spaces': 0,
    'semi': 0,
    'no-unused-vars':0
  },
  parserOptions: {
    parser: 'babel-eslint'
    }
}

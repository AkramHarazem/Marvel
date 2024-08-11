module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-shadow': 'off',
    'react/react-in-tsx-scope': 'off',
    'react/no-unstable-nested-components': 'off',
    eqeqeq: 'off',
    quotes: [
      'error',
      'single',
      {avoidEscape: true, allowTemplateLiterals: true},
    ],
  },
};

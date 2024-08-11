module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@common': './app/common',
          '@services': './app/services',
          '@store': './app/store',
          '@assets': './app/assets',
          '@navigators': './app/navigators',
          '@screens': './app/screens',
          '@components': './app/components',
          '@utils': './app/utils',
          '@hooks': './app/hooks',
          '@slices': './app/slices',
          '@selectors': './app/selectors',
        },
      },
    ],
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};

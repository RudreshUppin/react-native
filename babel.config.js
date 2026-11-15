module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@design-system': './src/design-system',
          '@tokens': './src/design-system/tokens',
          '@atoms': './src/design-system/atoms',
          '@molecules': './src/design-system/molecules',
          '@features': './src/features',
        },
      },
    ],
  ],
};

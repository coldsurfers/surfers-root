// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          react: path.resolve(__dirname, '../../node_modules/react'),
        },
      },
    ],
  ],
}

module.exports = {
  // presets: ['module:@react-native/babel-preset'],
  presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
  plugins: [
    'react-native-reanimated/plugin', // 반드시 마지막에 위치
  ],
};

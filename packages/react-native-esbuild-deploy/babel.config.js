module.exports = {
  // presets: ['module:@react-native/babel-preset'],
  presets: [
    // [
    //   '@babel/preset-env',
    //   {
    //     targets: { esmodules: false }, // 또는 node: '16' 등
    //     useBuiltIns: false,
    //     modules: 'auto',
    //   },
    // ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    // ['@babel/plugin-transform-runtime', { regenerator: true }],
    'react-native-reanimated/plugin', // 반드시 마지막에 위치
  ],
};

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
          'react': path.resolve(__dirname, '../../node_modules/react'),
          '@coldsurfers/ocean-road/native': path.resolve(__dirname, '../../packages/ocean-road/src/native/index.ts'),
          '@/screens': path.resolve(__dirname, './src/screens'),
          '@/navigations': path.resolve(__dirname, './src/navigations'),
          '@/lib': path.resolve(__dirname, './src/lib'),
          '@/components': path.resolve(__dirname, './src/components'),
          '@/ui': path.resolve(__dirname, './src/ui'),
        },
      },
    ],
  ],
}

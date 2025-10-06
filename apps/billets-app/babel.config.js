module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'hot-updater/babel-plugin',
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          react: '../../node_modules/react',
          '@coldsurfers/ocean-road/native': '../../node_modules/@coldsurfers/ocean-road/src/native',
          '@coldsurfers/ocean-road-extension/native':
            '../../node_modules/@coldsurfers/ocean-road-extension/src/native',
          '@coldsurfers/openapi-client/native': '../../packages/openapi-client/src/native/index.ts',
          '@/screens': './src/screens',
          '@/navigations': './src/navigations',
          '@/lib': './src/lib',
          '@/ui': './src/ui',
          '@/features': './src/features',
          '@/types': './src/types',
        },
      },
    ],
  ],
};

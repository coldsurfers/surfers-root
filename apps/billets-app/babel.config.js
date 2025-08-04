module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'hot-updater/babel-plugin',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          react: '../../node_modules/react',
          '@coldsurfers/ocean-road/native': '../../packages/ocean-road/src/native/index.ts',
          '@coldsurfers/ocean-road-extension/native':
            '../../packages/ocean-road-extension/src/native/index.ts',
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

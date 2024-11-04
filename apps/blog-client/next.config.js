/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const path = require('path')
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      'styled-components': path.resolve(__dirname, '../../node_modules/styled-components'),
    }
    config.resolve.extensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', ...config.resolve.extensions]

    return config
  },
  compiler: {
    styledComponents: true,
  },
  // i18n: {
  //   locales: ['en', 'ko'],
  //   defaultLocale: 'en',
  // },
}

module.exports = withNextIntl(nextConfig)

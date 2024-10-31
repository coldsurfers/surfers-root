/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const nextConfig = {
  experimental: {
    externalDir: true,
    // outputFileTracingRoot: path.join(__dirname, '../../'),
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'coldsurf-aws-s3-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig

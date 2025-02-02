/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.coldsurf.io',
        port: '',
      },
    ],
  },
  env: {
    APP_PLATFORM: process.env.APP_PLATFORM,
  },
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        destination: '/api/apple-app-site-association',
      },
      {
        source: '/.well-known/assetlinks.json',
        destination: '/api/assetlinks.json',
      },
      {
        source: '/browse',
        destination: '/api/browse',
      },
    ]
  },
}

module.exports = nextConfig

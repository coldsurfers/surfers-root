/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'abs.twimg.com',
      'pbs.twimg.com',
      's3.us-west-2.amazonaws.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      'upload.wikimedia.org',
    ],
    // formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
}

module.exports = withNextIntl(nextConfig)

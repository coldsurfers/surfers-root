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
      'github.com',
      'avatars.githubusercontent.com',
      'billets.coldsurf.io',
      'open.spotifycdn.com',
      'i.scdn.co',
      'www.youtube.com',
      'yt3.ggpht.com',
      's4.bcbits.com',
      'f4.bcbits.com',
    ],
    // formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
}

module.exports = withNextIntl(nextConfig)

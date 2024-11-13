/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  output: 'standalone',
}

module.exports = withNextIntl(nextConfig)

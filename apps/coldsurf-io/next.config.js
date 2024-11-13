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
        hostname: 'coldsurf-aws-s3-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig

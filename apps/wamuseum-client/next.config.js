/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    externalDir: true,
  },
  output: 'standalone',
};

module.exports = nextConfig;

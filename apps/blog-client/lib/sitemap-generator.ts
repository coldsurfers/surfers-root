/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require('nextjs-sitemap-generator')
const path = require('path')

const PAGES_DIRECTORY_PATH = path.resolve(__dirname, '../.next/server/pages')
const BASE_URL = 'https://blog.coldsurf.io'

sitemap({
  baseUrl: BASE_URL,
  // If you are using Vercel platform to deploy change the route to /.next/serverless/pages
  pagesDirectory: PAGES_DIRECTORY_PATH,
  targetDirectory: 'public/',
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: ['assets', '[id]', 'index.js.nft'], // Exclude everything that isn't static page
})

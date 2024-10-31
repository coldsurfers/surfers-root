/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.coldsurf.io',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: ['/resume', '/writers'],
  // optional
  robotsTxtOptions: {
    policies: [{ disallow: ['/resume/', '/writers/'], userAgent: '*', allow: '/' }],
  },
}

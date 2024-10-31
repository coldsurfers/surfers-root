/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.coldsurf.io',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: ['/resume', '/writers'],
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [`https://blog.coldsurf.io/server-sitemap.xml`],
    policies: [{ disallow: ['/resume/', '/writers/'], userAgent: '*', allow: '/' }],
  },
}

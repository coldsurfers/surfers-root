/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.coldsurf.io',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: ['/resume'],
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [`https://blog.coldsurf.io/server-sitemap.xml`],
    policies: [{ disallow: '/resume/', userAgent: '*', allow: '/' }],
  },
}

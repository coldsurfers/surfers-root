import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/en/resume', '/en/about', '/en/about/paul', '/ko/resume', '/ko/about', '/ko/about/paul'],
    },
    sitemap: 'https://blog.coldsurf.io/sitemap.xml',
    host: 'https://blog.coldsurf.io',
  }
}

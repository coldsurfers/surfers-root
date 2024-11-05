import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/en/resume', '/en/writers', '/ko/resume', '/ko/writers'],
    },
    sitemap: 'https://blog.coldsurf.io/sitemap.xml',
    host: 'https://blog.coldsurf.io',
  }
}

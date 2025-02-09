import { SITE_MAP_URL, SITE_URL } from '@/libs/constants'
import type { MetadataRoute } from 'next'

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  const rules = (() => {
    switch (process.env.APP_PLATFORM) {
      case 'production':
        return [
          {
            allow: '/',
            userAgent: '*',
          },
        ]
      case 'staging':
      default:
        return [
          {
            disallow: '/',
            userAgent: '*',
          },
        ]
    }
  })()
  return {
    host: SITE_URL,
    sitemap: SITE_MAP_URL,
    rules,
  }
}

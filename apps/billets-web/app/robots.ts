import { SITE_MAP_URL, SITE_URL } from '@/libs/constants'
import type { MetadataRoute } from 'next'

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    sitemap: SITE_MAP_URL,
    rules: [
      {
        allow: '/',
        userAgent: '*',
      },
    ],
  }
}

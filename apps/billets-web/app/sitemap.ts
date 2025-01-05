const siteUrl = 'https://billets.coldsurf.io'

const generateUrl = (subPath: string) => {
  return `${siteUrl}${subPath}`
}

export default async function sitemap() {
  return [
    {
      url: generateUrl(''),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: generateUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: generateUrl('/privacy-policy'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: generateUrl('/terms-of-service'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: generateUrl('/browse'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: generateUrl('/browse/seoul'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}

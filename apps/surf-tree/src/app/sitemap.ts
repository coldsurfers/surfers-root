export default async function sitemap() {
  return [
    {
      url: 'https://surf-tree.coldsurf.io',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://surf-tree.coldsurf.io/shevil',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}

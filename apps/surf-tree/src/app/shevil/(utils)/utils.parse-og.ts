export type OGInfo = {
  readonly title: string | null
  readonly description: string | null
  readonly image: string | null
  readonly url: string | null
}

export async function parseOG(siteUrl: string): Promise<OGInfo | null> {
  try {
    const response = await fetch(siteUrl)
    const html = await response.text() // Get the HTML content as text

    // Parse HTML and extract OG meta tags (client-side)
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    const getMetaTagContent = (property: 'title' | 'description' | 'image' | 'url') => {
      const metaTag = doc.querySelector(`meta[property="og:${property}"]`)
      return metaTag ? metaTag.getAttribute('content') : null
    }

    const ogInfo = {
      title: getMetaTagContent('title'),
      description: getMetaTagContent('description'),
      image: getMetaTagContent('image'),
      url: getMetaTagContent('url'),
      // You can add more properties if needed
    }
    return ogInfo
  } catch (error) {
    console.error('Error fetching OG data:', error)
    return null
  }
}

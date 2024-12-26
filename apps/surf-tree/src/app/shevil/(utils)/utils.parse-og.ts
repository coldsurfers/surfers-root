import * as cheerio from 'cheerio'

export type OGInfo = {
  readonly title: string | undefined
  readonly description: string | undefined
  readonly image: string | undefined
  readonly url: string | undefined
}

export async function parseOG(siteUrl: string): Promise<OGInfo | null> {
  try {
    const response = await fetch(siteUrl)
    const html = await response.text() // Get the HTML content as text

    const $ = cheerio.load(html)

    const ogInfo = {
      title: $('meta[property="og:title"]').attr('content'),
      description: $('meta[property="og:description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
      url: $('meta[property="og:url"]').attr('content'),
    }
    return ogInfo
  } catch (error) {
    console.error('Error fetching OG data:', error)
    return null
  }
}

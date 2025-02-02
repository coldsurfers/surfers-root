import { SITE_URL } from '@/libs/constants'
import { connectDbClient, dbClient, disconnectDbClient } from '@/libs/db/db.client'
import { cache } from 'react'

const generateUrl = (subPath: string) => {
  return `${SITE_URL}${subPath}`
}
const findAllVenues = cache(async () => {
  const venues = await dbClient.venue.findMany()
  return venues
})
const findAllArtists = cache(async () => {
  const artists = await dbClient.artist.findMany()
  return artists
})
const findAllCities = cache(async () => {
  const cities = await dbClient.locationCity.findMany()
  return cities
})
const findAllEvents = cache(async () => {
  const events = await dbClient.concert.findMany()
  return events
})
const findAllEventCategories = cache(async () => {
  const eventCategories = await dbClient.eventCategory.findMany()
  return eventCategories
})

export default async function sitemap() {
  await connectDbClient()
  const staticSitemaps = [
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
  ]

  const allCities = await findAllCities()

  // "/browse/[city]"
  const browseByCitySitemaps = allCities.map((city) => {
    const url = generateUrl(`/browse/${city.name}`)
    const lastModified = new Date()
    const changeFrequency = 'weekly'
    const priority = 0.8
    return {
      url,
      lastModified,
      changeFrequency,
      priority,
    }
  })

  // "/browse/[city]/[event-category]"
  const allEventCategories = await findAllEventCategories()
  const browseByCityEventCategorySitemaps = allCities
    .map((city) => {
      return allEventCategories.map((eventCategory) => {
        const url = generateUrl(`/browse/${city.name}/${eventCategory.name.toLowerCase()}`)
        const lastModified = new Date()
        const changeFrequency = 'weekly'
        const priority = 0.8
        return {
          url,
          lastModified,
          changeFrequency,
          priority,
        }
      })
    })
    .flat()

  const allEvents = await findAllEvents()

  // "/event/[event-id]"
  const eventSitemaps = allEvents.map((event) => {
    const url = generateUrl(`/event/${event.id}`)
    const lastModified = new Date()
    const changeFrequency = 'weekly'
    const priority = 0.8
    return {
      url,
      lastModified,
      changeFrequency,
      priority,
    }
  })

  // "/venue/[venue-id]"
  const allVenues = await findAllVenues()
  const venueSitemaps = allVenues.map((venue) => {
    const lastModified = new Date()
    const changeFrequency = 'weekly'
    const priority = 0.8
    return {
      url: generateUrl(`/venue/${venue.id}`),
      lastModified,
      changeFrequency,
      priority,
    }
  })

  // "/artist/[artist-id]"
  const allArtists = await findAllArtists()
  const artistSitemaps = allArtists.map((artist) => {
    const lastModified = new Date()
    const changeFrequency = 'weekly'
    const priority = 0.8
    return {
      url: generateUrl(`/artist/${artist.id}`),
      lastModified,
      changeFrequency,
      priority,
    }
  })

  await disconnectDbClient()
  return [
    ...staticSitemaps,
    ...browseByCitySitemaps,
    ...browseByCityEventCategorySitemaps,
    ...eventSitemaps,
    ...venueSitemaps,
    ...artistSitemaps,
  ]
}

import { SITE_URL } from '@/libs/constants'
import { dbClient } from '@/libs/db/db.client'
import { apiClient } from '@/libs/openapi-client'
import { validateCityParam } from '@/libs/utils'
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

export default async function sitemap() {
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

  const availableCities = (await apiClient.location.getCountries())
    .flatMap((value) => value.cities)
    .map((value) => value.name)

  // "/browse/[city]"
  const browseByCitySitemaps = availableCities.map((city) => {
    const url = generateUrl(`/browse/${city}`)
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

  // "/event/[event-id]"
  const eventSitemaps = (
    await Promise.all(
      availableCities.map(async (city) => {
        const validation = await validateCityParam(city)
        if (!validation.isValid) {
          return []
        }
        const { data: cityData } = validation
        const events = await apiClient.event.getEvents({
          offset: 0,
          // @todo: temp
          size: 100,
          latitude: cityData.lat,
          longitude: cityData.lng,
        })
        const lastModified = new Date()
        const changeFrequency = 'weekly'
        const priority = 0.8
        return (
          events?.map((event) => ({
            url: generateUrl(`/event/${event.data.id}`),
            lastModified,
            changeFrequency,
            priority,
          })) ?? []
        )
      }),
    )
  ).flat()

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
  return [...staticSitemaps, ...browseByCitySitemaps, ...eventSitemaps, ...venueSitemaps, ...artistSitemaps]
}

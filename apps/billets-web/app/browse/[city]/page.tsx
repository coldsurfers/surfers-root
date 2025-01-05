import { apiClient } from '@/libs/openapi-client'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { PageProps } from 'types/common-types'
import { ConcertList } from './(components)'

const validateCityParam = cache(async (cityParam: string) => {
  const city = decodeURIComponent(cityParam)
  const countries = await apiClient.location.getCountries()
  const cities = countries.flatMap((c) => c.cities)

  const isValidCity = cities.some((c) => {
    return c.name === city
  })
  if (!isValidCity) {
    return {
      isValid: false,
      data: null,
    } as const
  }
  const remoteCity = cities.find((c) => c.name === city)
  if (!remoteCity) {
    return {
      isValid: false,
      data: null,
    } as const
  }
  return {
    isValid: true,
    data: {
      ...remoteCity,
    },
  } as const
})

export async function generateMetadata({ params }: PageProps<{ city: string }>): Promise<Metadata> {
  const validation = await validateCityParam(params.city)
  if (!validation.isValid) {
    return {
      title: 'Billets | Discover shows around the world',
      description:
        'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
    }
  }
  return {
    title: `Popular shows in ${validation.data.uiName} | Billets`,
    description:
      'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
  }
}

export default async function BrowseByCityPage(props: PageProps<{ city: string }>) {
  const validation = await validateCityParam(props.params.city)

  if (!validation.isValid) {
    return redirect('/404')
  }

  const cityData = validation.data

  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.concerts.queryKeys.getConcerts({
        offset: 0,
        size: 20,
        latitude: cityData.lat,
        longitude: cityData.lng,
      }),
      queryFn: () =>
        apiClient.concerts.getConcerts({
          offset: 0,
          size: 20,
          latitude: cityData.lat,
          longitude: cityData.lng,
        }),
    })
  } catch (e) {
    console.error(e)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConcertList cityData={cityData} />
    </HydrationBoundary>
  )
}

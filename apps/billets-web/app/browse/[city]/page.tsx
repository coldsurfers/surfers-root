import { apiClient } from '@/libs/openapi-client'
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
  return {
    isValid: true,
    data: {
      uiName: cities.find((c) => c.name === city)?.uiName,
      name: city,
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

  return (
    <>
      <ConcertList />
    </>
  )
}

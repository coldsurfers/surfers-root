import { apiClient } from '@/libs/openapi-client'
import { redirect } from 'next/navigation'

export default async function BrowseByCityPage(props: {
  params: { city: string }
  searchParams: Record<string, never>
}) {
  const city = decodeURIComponent(props.params.city)
  const countries = await apiClient.location.getCountries()

  const isValidCity = countries.some((country) => {
    return country.cities.some((c) => {
      return c.name === city
    })
  })

  if (!isValidCity) {
    return redirect('/404')
  }

  return null
}

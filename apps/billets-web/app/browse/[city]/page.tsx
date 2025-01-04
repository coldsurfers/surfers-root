export default function BrowseByCityPage(props: { params: { city: string }; searchParams: Record<string, never> }) {
  const { city } = props.params
  console.log(city)
  return null
}

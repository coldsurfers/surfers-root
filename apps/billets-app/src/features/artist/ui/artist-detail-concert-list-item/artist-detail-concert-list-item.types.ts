// @todo: fix types
type ArtistDetailConcertListItemType = {
  artists: {
    id: string
    name: string
    profileImageUrl: string
  }[]
  date: string
  id: string
  posters: {
    imageUrl: string
  }[]
  tickets: {
    openDate: string
    prices: {
      currency: string
      id: string
      price: number
    }[]
    seller: string
    url: string
  }[]
  title: string
  venues: {
    address: string
    latitude: number
    longitude: number
    venueTitle: string
  }[]
}

export type ArtistDetailConcertListItemProps = {
  item: ArtistDetailConcertListItemType
  onPress: (item: ArtistDetailConcertListItemType) => void
}

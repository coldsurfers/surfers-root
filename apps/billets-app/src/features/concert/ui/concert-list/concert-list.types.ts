export type ConcertListItemT = {
  date: string
  id: string
  posters: {
    imageUrl: string
  }[]
  title: string
  venues: {
    venueTitle: string
  }[]
}

type VenueDetailConcertListItemType = {
  date: string | null
  id: string
  title: string
}

export type VenueDetailConcertListItemProps = {
  item: VenueDetailConcertListItemType
  onPress: (item: VenueDetailConcertListItemType) => void
  onPressSubscribe: (params: { concertId: string; isSubscribed: boolean }) => void
}

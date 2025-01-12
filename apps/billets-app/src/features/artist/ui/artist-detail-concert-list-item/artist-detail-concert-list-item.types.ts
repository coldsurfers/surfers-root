type ArtistDetailConcertListItemType = {
  date: string | null
  id: string
  title: string
}

export type ArtistDetailConcertListItemProps = {
  item: ArtistDetailConcertListItemType
  onPress: (item: ArtistDetailConcertListItemType) => void
}

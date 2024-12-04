export interface ConcertDetailSectionListDateItemProps {
  date: string
}
export interface ConcertDetailSectionListLocationItemProps {
  location: string
}
export interface ConcertDetailSectionListPriceItemProps {
  priceInfo: {
    description: string
    price: string
  }
}
export interface ConcertDetailSectionListTicketOpenDateItemProps {
  openDate: string
  description: string
}
export interface ConcertDetailSectionListTitleItemProps {
  title: string
}
export type ConcertDetailSectionListLineupItemProps = {
  thumbnailUrl: string
  name: string
  artistId: string
  onPress?: () => void
  onPressSubscribeArtist: (params: { isSubscribed: boolean }) => void
}
export type ConcertDetailSectionListTicketSellerItemProps = {
  siteUrl: string
  name: string
}
export type ConcertDetailSectionListVenueMapItemProps = {
  latitude: number
  longitude: number
  address: string
  onPressMap?: () => void
  onPressProfile?: () => void
  venueTitle: string
  venueId: string
}

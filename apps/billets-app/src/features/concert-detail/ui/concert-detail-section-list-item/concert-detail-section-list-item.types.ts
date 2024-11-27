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
  onPress?: () => void
}
export type ConcertDetailSectionListTicketSellerItemProps = {
  siteUrl: string
  name: string
}

export type ConcertDetailVenueSectionData = {
  name: string
}
export type ConcertDetailDateSectionData = {
  date: string
}
export type ConcertDetailLineupSectionData = {
  thumbnailUrl: string
  name: string
}
export type ConcertDetailTicketSellerSectionData = {
  siteUrl: string
  name: string
}
export type ConcertDetailTitleSectionData = {
  title: string
}
export type ConcertPriceSectionData = {
  description: string
  price: string
}
export type ConcertTicketOpenDateSectionData = {
  description: string
  openDate: string
}
export type ConcertHtmlSectionData = {
  html: string
}

export type ConcertDetailSectionListItemT =
  | ConcertDetailVenueSectionData
  | ConcertDetailDateSectionData
  | ConcertDetailLineupSectionData
  | ConcertDetailTicketSellerSectionData
  | ConcertDetailTitleSectionData
  | ConcertPriceSectionData
  | ConcertTicketOpenDateSectionData
  | ConcertHtmlSectionData

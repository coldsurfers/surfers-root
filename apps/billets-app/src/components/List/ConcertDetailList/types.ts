import { SectionListData } from 'react-native'

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

export type ConcertDetailSectionListSectionT = {
  title: 'venue' | 'date' | 'lineup' | 'ticket-seller' | 'title' | 'price-info' | 'ticket-open-date' | 'html'
  sectionHeaderTitle?:
    | '라인업'
    | '티켓 판매처'
    | '가격 정보'
    | '공연 날짜'
    | '공연 장소'
    | '티켓 오픈 날짜'
    | '종합 정보'
}

export type ConcertDetailSectionListSection = SectionListData<
  ConcertDetailSectionListItemT,
  ConcertDetailSectionListSectionT
>

export type ConcertDetailSectionListSections = ReadonlyArray<ConcertDetailSectionListSection>

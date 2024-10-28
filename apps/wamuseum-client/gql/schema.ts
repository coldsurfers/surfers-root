export interface HttpError {
  __typename: 'HttpError'
  code: number
  message: string
}

export interface EmailAuthRequest {
  __typename: 'EmailAuthRequest'
  id: number
  email: string
  authenticated: boolean | null
  createdAt: string
}

export type AuthenticateEmailAuthRequestData =
  | EmailAuthRequest
  | HttpError
  | null

export interface User {
  __typename: 'User'
  id: string
  email: string
  isAdmin: Boolean | null
  createdAt: String | null
}

export type CreateUserData = User | HttpError | null

export type MeData = User | HttpError | null

export type AuthToken = {
  accessToken: string
  refreshToken: string
}

export interface UserWithAuthToken {
  __typename: 'UserWithAuthToken'
  user: User
  authToken: AuthToken
}

export type LoginData = UserWithAuthToken | HttpError | null

export interface ConcertPoster {
  __typename: 'ConcertPoster'
  id: number
  imageURL: string
}

export interface ConcertTicketPrice {
  __typename: 'ConcertTicketPrice'
  id: number
  title: string
  price: number
  priceCurrency: string
}

export interface ConcertTicket {
  __typename: 'ConcertTicket'
  id: number | null
  openDate: string | null
  seller: string | null
  sellingURL: string | null
  ticketPrices: ConcertTicketPrice[]
}

export interface ConcertCategory {
  __typename: 'ConcertCategory'
  id: number
  title: string
}

export interface Concert {
  __typename: 'Concert'
  concertCategory: ConcertCategory
  artist: string | null
  date: string | null
  location: string | null
  id: number
  posters: ConcertPoster[] | null
  tickets: ConcertTicket[] | null
  title: string
  createdAt: string
  updatedAt: string | null
}

export interface Pagination {
  __typename: 'Pagination'
  current: number
  count: number
}

export interface ConcertList {
  __typename: 'ConcertList'
  list: Concert[]
}

export interface ConcertCategoryList {
  __typename: 'ConcertCategoryList'
  list: ConcertCategory[]
}

interface ConcertListWithPagination {
  __typename: 'ConcertListWithPagination'
  list: ConcertList
  pagination: Pagination
}

export type ConcertListData = ConcertListWithPagination | HttpError | null

export type ConcertCategoryListData = ConcertCategoryList | HttpError | null

export type CreateConcertData = Concert | HttpError | null

export interface CreateConcertInput {
  concertCategoryId: number
  artist: string
  title: string
  location: string
  date: string
  posterURLs: string[]
  tickets: {
    openDate: string
    seller: string
    sellingURL: string
    ticketPrices: {
      title: string
      price: number
      priceCurrency: string
    }[]
  }[]
}

export interface UpdateConcertInput {
  id: number
  artist: string
  title: string
  location: string
  date: string
  posterURLs?: string[]
  tickets?: {
    openDate: string
    seller: string
    sellingURL: string
    ticketPrices: {
      title: string
      price: number
      priceCurrency: string
    }[]
  }[]
  concertCategoryId: number
}

export type ConcertData = Concert | HttpError | null

export type UpdateConcertData = Concert | HttpError | null

export type UpdateConcertPosterData = ConcertPoster | HttpError | null

export type CreateConcertPosterData = ConcertPoster | HttpError | null

export interface RemovedConcert {
  __typename: 'RemovedConcert'
  id: number
}

export type RemoveConcertData = RemovedConcert | HttpError | null

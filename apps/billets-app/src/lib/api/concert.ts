import { Concert, ConcertCategory, RecentConcertListItem } from '../../types/Concert'
import axiosClient from './axiosClient'

export type GetConcertListParams = {
  size: number
  offset: number
  categoryId?: number
}

export const getConcertList = ({ offset, size, categoryId }: GetConcertListParams) => {
  let queryString = ''
  if (categoryId) {
    queryString += `&categoryId=${categoryId}`
  }
  if (typeof offset === 'number') {
    queryString += `&offset=${offset}`
  }
  if (typeof size === 'number') {
    queryString += `&size=${size}`
  }
  return axiosClient.get<Array<Concert>>(`/api/concert?${queryString}`)
}

export const getRecentConcertList = async () => {
  return axiosClient.get<Array<RecentConcertListItem>>('/api/concert/recent')
}

export const getConcert = (id: number) => {
  return axiosClient.get<Concert>(`/api/concert/${id}`)
}

export const getConcertCategoryList = () => {
  return axiosClient.get<Array<ConcertCategory>>('/api/concert/category')
}

export type SearchConcertParams = {
  keyword: string
  offset: number
  size: number
}

export const searchConcert = ({ keyword, offset, size }: SearchConcertParams) => {
  const queryString = `keyword=${keyword}&offset=${offset}&size=${size}`
  return axiosClient.get<Array<Concert>>(`/api/concert?${queryString}`)
}

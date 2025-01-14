import { SearchDTO } from '@/dtos/search.dto'

export interface SearchRepository {
  searchManyByKeyword(keyword: string): Promise<SearchDTO[]>
}

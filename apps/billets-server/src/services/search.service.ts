import type { SearchDTO } from '@/dtos/search.dto';
import type { SearchRepository } from '@/repositories/search.repository';

export class SearchService {
  private searchRepository: SearchRepository;

  constructor(searchRepository: SearchRepository) {
    this.searchRepository = searchRepository;
  }

  async searchManyByKeyword(keyword: string): Promise<SearchDTO[]> {
    return this.searchRepository.searchManyByKeyword(keyword);
  }
}

import type { EventCategoryDTO } from '@/dtos/event-category.dto';
import type { EventCategoryRepository } from '@/repositories/event-category.repository';

export class EventCategoryService {
  constructor(private eventCategoryRepository: EventCategoryRepository) {}

  async getAll(): Promise<EventCategoryDTO[]> {
    return this.eventCategoryRepository.findAll();
  }
}

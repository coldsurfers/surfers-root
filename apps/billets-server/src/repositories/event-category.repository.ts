import type { EventCategoryDTO } from '@/dtos/event-category.dto';

export interface EventCategoryRepository {
  findAll(): Promise<EventCategoryDTO[]>;
}

import { EventCategoryDTO } from '@/dtos/event-category.dto'
import { dbClient } from '@/lib/db'
import { EventCategory } from '@prisma/client'
import { EventCategoryRepository } from './event-category.repository'

export class EventCategoryRepositoryImpl implements EventCategoryRepository {
  async findAll(): Promise<EventCategoryDTO[]> {
    const data = await dbClient.eventCategory.findMany({
      orderBy: {
        serialNumber: 'asc',
      },
      where: {
        deletedAt: {
          equals: null,
        },
      },
    })
    return data.map(this.toDTO)
  }

  private toDTO(model: EventCategory): EventCategoryDTO {
    return {
      id: model.id,
      name: model.name,
    }
  }
}

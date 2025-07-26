import type { CopyrightDTO } from '@/dtos/copyright.dto';
import { dbClient } from '@/lib/db';
import type { Copyright } from '@prisma/client';
import type { CopyrightRepository } from './copyright.repository';

export class CopyrightRepositoryImpl implements CopyrightRepository {
  async findByArtistProfileImageId(artistProfileImageId: string): Promise<CopyrightDTO | null> {
    const data = await dbClient.copyright.findFirst({
      where: {
        ArtistProfileImage: {
          some: {
            id: artistProfileImageId,
          },
        },
      },
    });
    return data ? this.toDTO(data) : null;
  }

  private toDTO(model: Copyright): CopyrightDTO {
    return {
      id: model.id,
      owner: model.owner,
      license: model.license,
      licenseURL: model.licenseURL,
    };
  }
}

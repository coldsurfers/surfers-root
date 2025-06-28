import type { ArtistProfileImageDetailDTO } from '@/dtos/artist-profile-image-detail.dto';
import type { ArtistProfileImageDTO } from '@/dtos/artist-profile-image.dto';
import { dbClient } from '@/lib/db';
import type { ArtistProfileImage, Copyright } from '@prisma/client';
import type { ArtistProfileImageRepository } from './artist-profile-image.repository';

export class ArtistProfileImageRepositoryImpl implements ArtistProfileImageRepository {
  async findMany(params: { artistId: string }): Promise<ArtistProfileImageDTO[]> {
    const data = await dbClient.artistProfileImage.findMany({
      where: {
        artistId: params.artistId,
      },
    });
    return data.map((value) => this.toDTO(value));
  }

  async findOne(params: {
    artistProfileImageId: string;
  }): Promise<ArtistProfileImageDetailDTO | null> {
    const data = await dbClient.artistProfileImage.findUnique({
      where: {
        id: params.artistProfileImageId,
      },
      include: {
        copyright: true,
      },
    });
    if (!data) {
      return null;
    }
    return this.toDetailDTO(data);
  }

  private toDTO(model: ArtistProfileImage): ArtistProfileImageDTO {
    return {
      id: model.id,
      url: model.imageURL,
    };
  }

  private toDetailDTO(
    model: ArtistProfileImage & {
      copyright: Copyright | null;
    }
  ): ArtistProfileImageDetailDTO {
    return {
      id: model.id,
      url: model.imageURL,
      copyright: model.copyright,
    };
  }
}

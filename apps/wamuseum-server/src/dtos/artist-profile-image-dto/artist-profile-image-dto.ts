import type { ArtistProfileImage } from '@prisma/client';
import { prisma } from '../../libs/db/db.utils';
import { generateImageApiUrl } from '../../utils/image.utils';
import {
  type ArtistProfileImageDTOSerialized,
  artistProfileImageDTOSerializedSchema,
} from './artist-profile-image-dto.types';

export class ArtistProfileImageDTO {
  private props: Partial<ArtistProfileImage>;
  constructor(props: Partial<ArtistProfileImage>) {
    this.props = props;
  }

  async create({ imageKey }: { imageKey: string }) {
    if (!this.props.artistId) {
      throw Error('invalid artistId');
    }
    const data = await prisma.artistProfileImage.create({
      data: {
        imageURL: generateImageApiUrl(imageKey),
        artistId: this.props.artistId,
      },
    });
    return new ArtistProfileImageDTO(data);
  }

  public serialize(): ArtistProfileImageDTOSerialized {
    const validation = artistProfileImageDTOSerializedSchema.safeParse(this.props);
    if (!validation.success) {
      throw validation.error;
    }
    return validation.data;
  }
}

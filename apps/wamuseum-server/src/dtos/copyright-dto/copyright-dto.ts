import type { Copyright } from '@prisma/client';
import { prisma } from '../../libs/db/db.utils';
import type { CopyrightDTOSerialized } from './copyright-dto.types';

export class CopyrightDTO {
  private props: Partial<Copyright>;
  constructor(props: Partial<Copyright>) {
    this.props = props;
  }

  async create({ artistProfileImageId }: { artistProfileImageId?: string }) {
    if (!this.props.license) {
      throw Error('invalid license');
    }
    if (!this.props.owner) {
      throw Error('invalid owner');
    }
    if (!this.props.licenseURL) {
      throw Error('invalid license url');
    }
    const data = await prisma.copyright.create({
      data: {
        license: this.props.license,
        owner: this.props.owner,
        licenseURL: this.props.licenseURL,
        ArtistProfileImage: {
          connect: {
            id: artistProfileImageId,
          },
        },
      },
    });
    return new CopyrightDTO(data);
  }

  serialize(): CopyrightDTOSerialized {
    if (!this.props.id) {
      throw Error('invalid id');
    }
    if (!this.props.license) {
      throw Error('invalid license');
    }
    if (!this.props.owner) {
      throw Error('invalid owner');
    }
    return {
      id: this.props.id,
      license: this.props.license,
      owner: this.props.owner,
    };
  }
}

import type { Venue } from '@prisma/client';
import type { Venue as VenueResolverType } from '../../gql/resolvers-types';
import { prisma } from '../libs/db/db.utils';

type VenueDTOProps = Partial<Venue>;

export default class VenueDTO {
  props: VenueDTOProps;

  constructor(props: VenueDTOProps) {
    this.props = props;
  }

  async create() {
    const { lat, lng, name, geohash, address } = this.props;
    if (!lat || !lng || !name || !geohash || !address) {
      throw Error('invalid props');
    }
    const data = await prisma.venue.create({
      data: {
        lat,
        lng,
        name,
        geohash,
        address,
      },
    });
    return new VenueDTO(data);
  }

  async connect(concertId: string) {
    if (!this.props.id) {
      throw Error('invalid id.');
    }
    const data = await prisma.concertsOnVenues.create({
      data: {
        concertId,
        venueId: this.props.id,
      },
      include: {
        venue: true,
      },
    });
    return new VenueDTO({
      ...data.venue,
    });
  }

  static async search(keyword: string) {
    const data = await prisma.venue.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
    });

    return data.map((value) => new VenueDTO(value));
  }

  static async find(concertId: string) {
    const data = await prisma.concertsOnVenues.findMany({
      where: {
        concertId,
      },
      include: {
        venue: true,
      },
    });
    return data.map((value) => new VenueDTO(value.venue));
  }

  async delete(concertId: string) {
    if (!this.props.id) {
      throw Error('invalid id');
    }
    const data = await prisma.concertsOnVenues.delete({
      where: {
        concertId_venueId: {
          concertId,
          venueId: this.props.id,
        },
      },
      include: {
        venue: true,
      },
    });
    return new VenueDTO(data.venue);
  }

  serialize(): VenueResolverType {
    return {
      __typename: 'Venue',
      geohash: this.props.geohash ?? '',
      id: this.props.id ?? '',
      lat: this.props.lat ?? 0.0,
      lng: this.props.lng ?? 0.0,
      name: this.props.name ?? '',
      address: this.props.address ?? '',
    };
  }
}

import type { EmailAuthRequest } from '@prisma/client';
import type { EmailAuthRequest as EmailAuthRequestResolverType } from '../../gql/resolvers-types';
import { prisma } from '../libs/db/db.utils';
import { createEmailAuthCode } from '../utils/createEmailAuthcode';

export default class EmailAuthRequestDTO {
  props: Partial<EmailAuthRequest>;

  constructor(props: Partial<EmailAuthRequest>) {
    this.props = props;
  }

  async create() {
    if (!this.props.email) {
      throw Error('invalid email value');
    }
    const created = await prisma.emailAuthRequest.create({
      data: {
        email: this.props.email,
        authcode: createEmailAuthCode(),
      },
      select: {
        id: true,
        email: true,
        authcode: true,
        createdAt: true,
      },
    });
    return new EmailAuthRequestDTO(created);
  }

  static async findLatest(email: string) {
    const result = await prisma.emailAuthRequest.findFirst({
      where: {
        email,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        authcode: true,
        authenticated: true,
        createdAt: true,
        email: true,
        authenticatedAt: true,
      },
    });
    if (!result) return null;
    return new EmailAuthRequestDTO(result);
  }

  async update({ id, authenticated }: { id: string; authenticated: boolean }) {
    const updated = await prisma.emailAuthRequest.update({
      where: {
        id,
      },
      data: {
        authenticated,
      },
      select: {
        id: true,
        authcode: true,
        authenticated: true,
        createdAt: true,
        email: true,
        authenticatedAt: true,
      },
    });
    return new EmailAuthRequestDTO(updated);
  }

  serialize(): EmailAuthRequestResolverType {
    return {
      __typename: 'EmailAuthRequest',
      authcode: this.props.authcode ?? '',
      authenticated: this.props.authenticated,
      createdAt: this.props.createdAt?.toISOString() ?? '',
      email: this.props.email ?? '',
      id: this.props.id ?? '',
    };
  }
}

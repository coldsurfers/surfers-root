import type { CreateUserDTO, UserDTO } from '@/dtos/user.dto';
import { dbClient } from '@/lib/db';
import { generateSlug } from '@coldsurfers/shared-utils';
import { generate as generateRandomWords } from 'random-words';
import type { UserRepository } from './user.repository';

interface UserModel {
  id: string;
  deactivatedAt: Date | null;
  email: string;
  provider: string;
}

export class UserRepositoryImpl implements UserRepository {
  async create(user: CreateUserDTO): Promise<UserDTO> {
    const newUser = await dbClient.user.create({
      data: {
        email: user.email,
        provider: user.provider,
        password: user.password,
        passwordSalt: user.passwordSalt,
      },
    });
    return this.toDTO(newUser);
  }

  async findById(id: string): Promise<UserDTO | null> {
    const user = await dbClient.user.findUnique({
      where: {
        id,
      },
    });
    return user ? this.toDTO(user) : null;
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await dbClient.user.findUnique({
      where: {
        email,
      },
    });
    return user ? this.toDTO(user) : null;
  }

  async findPasswordSalt(id: string): Promise<string | null> {
    const user = await dbClient.user.findUnique({
      where: {
        id,
      },
      select: {
        passwordSalt: true,
      },
    });
    return user ? user.passwordSalt : null;
  }

  async findPassword(id: string): Promise<string | null> {
    const user = await dbClient.user.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
    return user ? user.password : null;
  }

  async activate(id: string): Promise<UserDTO | null> {
    const user = await dbClient.user.update({
      where: {
        id,
      },
      data: {
        deactivatedAt: null,
      },
    });
    return user ? this.toDTO(user) : null;
  }

  async deactivate(id: string): Promise<UserDTO | null> {
    const user = await dbClient.user.update({
      where: {
        id,
      },
      data: {
        deactivatedAt: new Date(),
      },
    });
    return user ? this.toDTO(user) : null;
  }

  async findHandleByEmail(email: string): Promise<string | null> {
    const user = await dbClient.user.findUnique({
      where: {
        email,
      },
      select: {
        handle: true,
      },
    });
    return user?.handle ?? null;
  }

  async findUserByHandle(handle: string): Promise<UserDTO | null> {
    const user = await dbClient.user.findUnique({
      where: {
        handle,
      },
    });

    return user ? this.toDTO(user) : null;
  }

  async createUserHandleByEmail(email: string): Promise<string> {
    const seedValue = email.split('@').at(0) ?? (generateRandomWords(2) as string[]).join(' ');
    const handleValue = await generateSlug(
      seedValue,
      async (newSlug) => {
        const user = await this.findUserByHandle(newSlug);
        return !!user;
      },
      {
        lower: false,
        strict: true,
      }
    );
    return handleValue;
  }

  private toDTO(user: UserModel): UserDTO {
    return {
      id: user.id,
      deactivatedAt: user.deactivatedAt,
      email: user.email,
      provider: user.provider,
    };
  }
}

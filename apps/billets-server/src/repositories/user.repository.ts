import type { CreateUserDTO, UserDTO } from '@/dtos/user.dto';

export interface UserRepository {
  create(user: CreateUserDTO): Promise<UserDTO>;
  findById(id: string): Promise<UserDTO | null>;
  findByEmail(email: string): Promise<UserDTO | null>;
  findPasswordSalt(id: string): Promise<string | null>;
  findPassword(id: string): Promise<string | null>;
  activate(id: string): Promise<UserDTO | null>;
  deactivate(id: string): Promise<UserDTO | null>;
  findHandleByEmail(email: string): Promise<string | null>;
  findUserByHandle(handle: string): Promise<UserDTO | null>;
  createUserHandleByEmail(seedValue: string): Promise<string>;
}

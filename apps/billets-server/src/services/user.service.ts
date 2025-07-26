import type { CreateUserDTO, UserDTO } from '@/dtos/user.dto';
import type { UserRepository } from '@/repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return this.userRepository.create(createUserDTO);
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<UserDTO | null> {
    return this.userRepository.findByEmail(email);
  }

  async getUserPasswordSalt(id: string): Promise<string | null> {
    return this.userRepository.findPasswordSalt(id);
  }

  async getUserPassword(id: string): Promise<string | null> {
    return this.userRepository.findPassword(id);
  }

  async activateUser(id: string): Promise<UserDTO | null> {
    return this.userRepository.activate(id);
  }

  async deactivateUser(id: string): Promise<UserDTO | null> {
    return this.userRepository.deactivate(id);
  }
}

import type { UserProfileDTO } from '@/dtos/user-profile.dto';
import type { UserProfileRepository } from '@/repositories/user-profile.repository';

export class UserProfileService {
  private userProfileRepository: UserProfileRepository;

  constructor(userProfileRepository: UserProfileRepository) {
    this.userProfileRepository = userProfileRepository;
  }

  async getUserProfileByHandle(handle: string): Promise<UserProfileDTO | null> {
    return this.userProfileRepository.getUserProfileByHandle(handle);
  }
}

import type { UserProfileDTO } from '@/dtos/user-profile.dto';

export interface UserProfileRepository {
  getUserProfileByHandle(handle: string): Promise<UserProfileDTO | null>;
}

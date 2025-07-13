import { z } from 'zod';
import { EventDTOSchema } from './event.dto';
import { UserHandleDTOSchema } from './user.dto';

export const UserProfileDTOSchema = z.object({
  handle: UserHandleDTOSchema,
  subscribedEvents: EventDTOSchema.array(),
});
export type UserProfileDTO = z.infer<typeof UserProfileDTOSchema>;

export const GetUserProfileByHandleParamsDTOSchema = z.object({
  handle: UserHandleDTOSchema,
});
export type GetUserProfileByHandleParamsDTO = z.infer<typeof GetUserProfileByHandleParamsDTOSchema>;

import { z } from 'zod'
import { userDTOSerializedSchema } from '../dtos/UserDTO.types'

export const getMeResponseSchema = userDTOSerializedSchema
export type GetMeResponse = z.infer<typeof getMeResponseSchema>

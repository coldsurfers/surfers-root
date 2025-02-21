import { z } from 'zod'

export const InfoMeItemTypeSchema = z.union([z.literal('artists'), z.literal('events'), z.literal('venues')])

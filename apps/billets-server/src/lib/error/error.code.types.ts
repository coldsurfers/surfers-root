import { z } from 'zod'

export const errorCodeSchema = z.union([
  z.literal('INVALID_PASSWORD'),
  z.literal('INVALID_ACCESS_TOKEN'),
  z.literal('USER_NOT_FOUND'),
  z.literal('CONCERT_NOT_FOUND'),
  z.literal('SUBSCRIBED_CONCERT_NOT_FOUND'),
  z.literal('ARTIST_NOT_FOUND'),
  z.literal('VENUE_NOT_FOUND'),
  z.literal('SUBSCRIBED_ARTIST_NOT_FOUND'),
  z.literal('SUBSCRIBED_VENUE_NOT_FOUND'),
  z.literal('INVALID_USER'),
  z.literal('PASSWORD_NOT_MATCH'),
  z.literal('ACCESS_TOKEN_NOT_FOUND'),
  z.literal('USER_DEACTIVATED'),
  z.literal('UNKNOWN'),
])

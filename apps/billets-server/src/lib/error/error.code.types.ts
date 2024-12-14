import { z } from 'zod'

export const errorCodeSchema = z.union([
  z.literal('INVALID_PASSWORD'),
  z.literal('INVALID_ACCESS_TOKEN'),
  z.literal('INVALID_QUERY_STRING'),
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
  z.literal('USER_ALREADY_EXISTING'),
  z.literal('EMAIL_AUTH_REQUEST_NOT_FOUND'),
  z.literal('INVALID_EMAIL_AUTH_REQUEST'),
  z.literal('EMAIL_AUTH_REQUEST_ALREADY_AUTHENTICATED'),
  z.literal('EMAIL_AUTH_REQUEST_TIMEOUT'),
  z.literal('UNKNOWN'),
])

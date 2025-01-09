import { z } from 'zod'

export const subscribeConcertParamsSchema = z.object({
  id: z.string(),
})
export const subscribeConcertBodySchema = z.object({
  id: z.string(),
})

export const getSubscribeCommonParamsSchema = z.object({
  id: z.string(),
})

export type SubscribeConcertParams = z.infer<typeof subscribeConcertParamsSchema>

export const subscribeArtistParamsSchema = z.object({
  id: z.string(),
})

export type SubscribeArtistParams = z.infer<typeof subscribeArtistParamsSchema>

export const subscribeVenueParamsSchema = z.object({
  id: z.string(),
})

export type SubscribeVenueParams = z.infer<typeof subscribeVenueParamsSchema>

export const getSubscribedConcertListQueryStringSchema = z.object({
  offset: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(1).max(100).default(20),
})
export type GetSubscribedConcertListQueryString = z.infer<typeof getSubscribedConcertListQueryStringSchema>

export const subscribeVenueBodySchema = z.object({
  type: z.literal('subscribe-venue'),
})

export const subscribeArtistBodySchema = z.object({
  type: z.literal('subscribe-artist'),
})

export const unsubscribeArtistBodySchema = z.object({
  type: z.literal('unsubscribe-artist'),
})
export const unsubscribeVenueBodySchema = z.object({
  type: z.literal('unsubscribe-venue'),
})

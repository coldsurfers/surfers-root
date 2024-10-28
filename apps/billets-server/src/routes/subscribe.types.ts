import { z } from 'zod'

export const subscribeConcertParamsSchema = z.object({
  id: z.string(),
})
export const subscribeConcertBodySchema = z.object({
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
  offset: z.string(),
  size: z.string(),
})
export type GetSubscribedConcertListQueryString = z.infer<typeof getSubscribedConcertListQueryStringSchema>

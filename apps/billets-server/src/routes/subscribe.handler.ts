import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify'
import { z } from 'zod'
import ArtistDTO from '../dtos/ArtistDTO'
import ConcertDTO from '../dtos/ConcertDTO'
import SubscribeArtistDTO from '../dtos/SubscribeArtistDTO'
import { subscribedArtistDTOSerializedSchema, SubscribedArtistSerialized } from '../dtos/SubscribeArtistDTO.types'
import SubscribeConcertDTO from '../dtos/SubscribeConcertDTO'
import {
  subscribeConcertDTOSerializedSchema,
  SubscribedConcertSerialized,
  SubscribedConcertSerializedList,
} from '../dtos/SubscribeConcertDTO.types'
import SubscribeVenueDTO from '../dtos/SubscribeVenueDTO'
import { SubscribeVenueSerialized, subscribeVenueSerializedSchema } from '../dtos/SubscribeVenueDTO.types'
import UserDTO from '../dtos/UserDTO'
import VenueDTO from '../dtos/VenueDTO'
import { ErrorResponse, errorResponseSchema } from '../lib/error'
import { decodeToken } from '../lib/jwt'
import {
  getSubscribeCommonParamsSchema,
  GetSubscribedConcertListQueryString,
  subscribeArtistBodySchema,
  SubscribeArtistParams,
  SubscribeConcertParams,
  subscribeVenueBodySchema,
  SubscribeVenueParams,
  unsubscribeArtistBodySchema,
  unsubscribeVenueBodySchema,
} from './subscribe.types'

export const getSubscribePreHandler = async (
  req: FastifyRequest<{
    Params: z.infer<typeof getSubscribeCommonParamsSchema>
  }>,
  rep: FastifyReply<{
    Reply: {
      200:
        | z.infer<typeof subscribeConcertDTOSerializedSchema>
        | z.infer<typeof subscribedArtistDTOSerializedSchema>
        | z.infer<typeof subscribeVenueSerializedSchema>
      401: z.infer<typeof errorResponseSchema>
      404: z.infer<typeof errorResponseSchema>
      500: z.infer<typeof errorResponseSchema>
    }
  }>,
) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'INVALID_USER', message: 'Unauthorized' })
    }
  } catch (e) {
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

export const getConcertSubscribeHandler: RouteHandler<{
  Params: z.infer<typeof getSubscribeCommonParamsSchema>
  Reply: {
    200: SubscribedConcertSerialized
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { id: concertId } = req.params
    const token = req.headers.authorization
    const decoded = decodeToken(token!)
    const user = await UserDTO.findById(decoded!.id)
    const subscribedConcert = await SubscribeConcertDTO.findByConcertIdUserId(concertId, user!.props.id!)
    if (!subscribedConcert) {
      return rep.status(404).send({
        code: 'SUBSCRIBED_CONCERT_NOT_FOUND',
        message: 'subscribed concert not found',
      })
    }
    return rep.status(200).send(subscribedConcert.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

export const getArtistSubscribeHandler: RouteHandler<{
  Params: z.infer<typeof getSubscribeCommonParamsSchema>
  Reply: {
    200: z.infer<typeof subscribedArtistDTOSerializedSchema>
    401: z.infer<typeof errorResponseSchema>
    404: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const { id: artistId } = req.params
    const token = req.headers.authorization
    const decoded = decodeToken(token!)
    const user = await UserDTO.findById(decoded!.id)
    const subscribedArtist = await SubscribeArtistDTO.findByArtistIdUserId(artistId, user!.id!)
    if (!subscribedArtist) {
      return rep.status(404).send({
        code: 'SUBSCRIBED_ARTIST_NOT_FOUND',
        message: 'subscribed artist not found',
      })
    }
    return rep.status(200).send(subscribedArtist.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

export const getVenueSubscribeHandler: RouteHandler<{
  Params: z.infer<typeof getSubscribeCommonParamsSchema>
  Reply: {
    200: z.infer<typeof subscribeVenueSerializedSchema>
    401: z.infer<typeof errorResponseSchema>
    404: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const { id: venueId } = req.params
    const token = req.headers.authorization
    const decoded = decodeToken(token!)
    const user = await UserDTO.findById(decoded!.id)
    const subscribedVenue = await SubscribeVenueDTO.findByVenueIdUserId(venueId, user!.id!)
    if (!subscribedVenue) {
      return rep.status(404).send({
        code: 'SUBSCRIBED_VENUE_NOT_FOUND',
        message: 'subscribed venue not found',
      })
    }
    return rep.status(200).send(subscribedVenue.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

export const subscribeConcertHandler: RouteHandler<{
  Params: SubscribeConcertParams
  Reply: {
    200: SubscribedConcertSerialized
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { id: concertId } = req.params
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'INVALID_USER', message: 'Unauthorized' })
    }

    const concert = await ConcertDTO.findById(concertId)
    if (!concert || !concert.props.id) {
      return rep.status(404).send({ code: 'CONCERT_NOT_FOUND', message: 'Concert not found' })
    }

    const subscribedConcert = await SubscribeConcertDTO.findByConcertIdUserId(concertId, user.props.id)

    if (subscribedConcert) {
      return rep.status(200).send(subscribedConcert.serialize())
    }

    const dto = new SubscribeConcertDTO({
      concertId,
      userId: user.props.id,
    })

    const data = await dto.subscribeConcert()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

export const unsubscribeConcertHandler: RouteHandler<{
  Params: SubscribeConcertParams
  Reply: {
    200: SubscribedConcertSerialized
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { id: concertId } = req.params
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'USER_NOT_FOUND', message: 'Unauthorized' })
    }

    const concert = await ConcertDTO.findById(concertId)
    if (!concert || !concert.props.id) {
      return rep.status(404).send({ code: 'CONCERT_NOT_FOUND', message: 'Concert not found' })
    }

    const subscribedConcert = await SubscribeConcertDTO.findByConcertIdUserId(concertId, user.props.id)

    if (!subscribedConcert) {
      return rep.status(404).send({ code: 'SUBSCRIBED_CONCERT_NOT_FOUND', message: 'Concert not found' })
    }

    const data = await subscribedConcert.unsubscribeConcert()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

export const subscribeArtistHandler: RouteHandler<{
  Params: SubscribeArtistParams
  Body: z.infer<typeof subscribeArtistBodySchema>
  Reply: {
    200: SubscribedArtistSerialized
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { id: artistId } = req.params
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'USER_NOT_FOUND', message: 'Unauthorized' })
    }

    const artist = await ArtistDTO.findById(artistId)
    if (!artist || !artist.id) {
      return rep.status(404).send({ code: 'ARTIST_NOT_FOUND', message: 'Artist not found' })
    }

    const subscribedArtist = await SubscribeArtistDTO.findByArtistIdUserId(artistId, user.props.id)

    if (subscribedArtist) {
      return rep.status(200).send(subscribedArtist.serialize())
    }

    const dto = new SubscribeArtistDTO({
      artistId,
      userId: user.props.id,
    })

    const data = await dto.subscribeArtist()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

export const unsubscribeArtistHandler: RouteHandler<{
  Params: SubscribeArtistParams
  Body: z.infer<typeof unsubscribeArtistBodySchema>
  Reply: {
    200: SubscribedArtistSerialized
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { id: artistId } = req.params
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'USER_NOT_FOUND', message: 'Unauthorized' })
    }

    const artist = await ArtistDTO.findById(artistId)
    if (!artist || !artist.id) {
      return rep.status(404).send({ code: 'ARTIST_NOT_FOUND', message: 'Artist not found' })
    }

    const subscribedArtist = await SubscribeArtistDTO.findByArtistIdUserId(artistId, user.props.id)

    if (!subscribedArtist) {
      return rep.status(404).send({ code: 'SUBSCRIBED_ARTIST_NOT_FOUND', message: 'Artist not found' })
    }

    const data = await subscribedArtist.unsubscribeArtist()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

export const subscribeVenueHandler: RouteHandler<{
  Params: SubscribeVenueParams
  Body: z.infer<typeof subscribeVenueBodySchema>
  Reply: {
    200: SubscribeVenueSerialized
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { id: venueId } = req.params
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'INVALID_USER', message: 'Unauthorized' })
    }

    const venue = await VenueDTO.findById(venueId)
    if (!venue || !venue.id) {
      return rep.status(404).send({ code: 'VENUE_NOT_FOUND', message: 'Venue not found' })
    }

    const subscribedVenue = await SubscribeVenueDTO.findByVenueIdUserId(venueId, user.props.id)

    if (subscribedVenue) {
      return rep.status(200).send(subscribedVenue.serialize())
    }

    const dto = new SubscribeVenueDTO({
      venueId,
      userId: user.props.id,
    })

    const data = await dto.subscribeVenue()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

export const unsubscribeVenueHandler: RouteHandler<{
  Params: SubscribeVenueParams
  Body: z.infer<typeof unsubscribeVenueBodySchema>
  Reply: {
    200: SubscribeVenueSerialized
    401: ErrorResponse
    404: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const { id: venueId } = req.params
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep
    }

    const venue = await VenueDTO.findById(venueId)
    if (!venue || !venue.id) {
      return rep.status(404).send({ code: 'VENUE_NOT_FOUND', message: 'Venue not found' })
    }

    const subscribedVenue = await SubscribeVenueDTO.findByVenueIdUserId(venueId, user.props.id)

    if (!subscribedVenue) {
      return rep.status(404).send({ code: 'SUBSCRIBED_VENUE_NOT_FOUND', message: 'Venue not found' })
    }

    const data = await subscribedVenue.unsubscribeVenue()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

export const getSubscribedConcertListHandler: RouteHandler<{
  Querystring: GetSubscribedConcertListQueryString
  Reply: {
    200: SubscribedConcertSerializedList
    401: ErrorResponse
    500: ErrorResponse
  }
}> = async (req, rep) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return rep.status(401).send({ code: 'ACCESS_TOKEN_NOT_FOUND', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'INVALID_ACCESS_TOKEN', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'INVALID_USER', message: 'Unauthorized' })
    }

    const { offset, size } = req.query

    const subscribedConcerts = await SubscribeConcertDTO.list({
      userId: user.props.id,
      take: +size,
      skip: +offset,
    })

    return rep.status(200).send(subscribedConcerts.map((value) => value.serialize()))
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

import { RouteHandler } from 'fastify'
import ArtistDTO from '../dtos/ArtistDTO'
import ConcertDTO from '../dtos/ConcertDTO'
import SubscribeArtistDTO from '../dtos/SubscribeArtistDTO'
import { SubscribedArtistSerialized } from '../dtos/SubscribeArtistDTO.types'
import SubscribeConcertDTO from '../dtos/SubscribeConcertDTO'
import { SubscribedConcertSerialized, SubscribedConcertSerializedList } from '../dtos/SubscribeConcertDTO.types'
import SubscribeVenueDTO from '../dtos/SubscribeVenueDTO'
import { SubscribeVenueSerialized } from '../dtos/SubscribeVenueDTO.types'
import UserDTO from '../dtos/UserDTO'
import VenueDTO from '../dtos/VenueDTO'
import { decodeToken } from '../lib/jwt'
import { ErrorResponse } from '../lib/types'
import {
  GetSubscribedConcertListQueryString,
  SubscribeArtistParams,
  SubscribeConcertParams,
  SubscribeVenueParams,
} from './subscribe.types'

export const getConcertSubscribeHandler: RouteHandler<{
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const subscribedConcert = await SubscribeConcertDTO.findByConcertIdUserId(concertId, user.props.id)
    if (!subscribedConcert) {
      return rep.status(404).send({
        code: 'NOT_FOUND',
        message: 'Concert not found',
      })
    }
    return rep.status(200).send(subscribedConcert.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }

    const concert = await ConcertDTO.findById(concertId)
    if (!concert || !concert.props.id) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Concert not found' })
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
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }

    const concert = await ConcertDTO.findById(concertId)
    if (!concert || !concert.props.id) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Concert not found' })
    }

    const subscribedConcert = await SubscribeConcertDTO.findByConcertIdUserId(concertId, user.props.id)

    if (!subscribedConcert) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Concert not found' })
    }

    const data = await subscribedConcert.unsubscribeConcert()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
  }
}

export const subscribeArtistHandler: RouteHandler<{
  Params: SubscribeArtistParams
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }

    const artist = await ArtistDTO.findById(artistId)
    if (!artist || !artist.id) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Artist not found' })
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
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
  }
}

export const unsubscribeArtistHandler: RouteHandler<{
  Params: SubscribeArtistParams
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }

    const artist = await ArtistDTO.findById(artistId)
    if (!artist || !artist.id) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Artist not found' })
    }

    const subscribedArtist = await SubscribeArtistDTO.findByArtistIdUserId(artistId, user.props.id)

    if (!subscribedArtist) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Artist not found' })
    }

    const data = await subscribedArtist.unsubscribeArtist()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
  }
}

export const subscribeVenueHandler: RouteHandler<{
  Params: SubscribeVenueParams
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }

    const venue = await VenueDTO.findById(venueId)
    if (!venue || !venue.id) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Venue not found' })
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
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
  }
}

export const unsubscribeVenueHandler: RouteHandler<{
  Params: SubscribeVenueParams
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep
    }

    const venue = await VenueDTO.findById(venueId)
    if (!venue || !venue.id) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Venue not found' })
    }

    const subscribedVenue = await SubscribeVenueDTO.findByVenueIdUserId(venueId, user.props.id)

    if (!subscribedVenue) {
      return rep.status(404).send({ code: 'NOT_FOUND', message: 'Venue not found' })
    }

    const data = await subscribedVenue.unsubscribeVenue()

    return rep.status(200).send(data.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
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
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const decoded = decodeToken(token)
    if (!decoded) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
    }
    const user = await UserDTO.findById(decoded.id)
    if (!user || !user.props.id) {
      return rep.status(401).send({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
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
    return rep.status(500).send({ code: 'INTERNAL_SERVER_ERROR', message: 'internal server error' })
  }
}

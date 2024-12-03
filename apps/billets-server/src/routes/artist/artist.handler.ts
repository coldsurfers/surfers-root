import { RouteHandler } from 'fastify'
import { errorResponseSchema } from 'src/lib/error'
import { z } from 'zod'
import ArtistDTO from '../../dtos/ArtistDTO'
import { ArtistDTOSerialized } from '../../dtos/ArtistDTO.types'
import { GetArtistByIdParams } from './artist.types'

export const getArtistByIdHandler: RouteHandler<{
  Params: GetArtistByIdParams
  Reply: {
    200: ArtistDTOSerialized
    404: z.infer<typeof errorResponseSchema>
    500: z.infer<typeof errorResponseSchema>
  }
}> = async (req, rep) => {
  try {
    const { id: artistId } = req.params
    const artistDTO = await ArtistDTO.findById(artistId)
    if (!artistDTO) {
      return rep.status(404).send({
        code: 'ARTIST_NOT_FOUND',
        message: 'artist not found',
      })
    }
    return rep.status(200).send(artistDTO.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send({
      code: 'UNKNOWN',
      message: 'internal server error',
    })
  }
}

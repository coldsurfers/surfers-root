import { RouteHandler } from 'fastify'
import ArtistDTO from '../../dtos/ArtistDTO'
import { ArtistDTOSerialized } from '../../dtos/ArtistDTO.types'
import { GetArtistByIdParams } from './artist.types'

export const getArtistByIdHandler: RouteHandler<{
  Params: GetArtistByIdParams
  Reply: {
    200: ArtistDTOSerialized
    404: void
    500: void
  }
}> = async (req, rep) => {
  try {
    const { id: artistId } = req.params
    const artistDTO = await ArtistDTO.findById(artistId)
    if (!artistDTO) {
      return rep.status(404).send()
    }
    return rep.status(200).send(artistDTO.serialize())
  } catch (e) {
    console.error(e)
    return rep.status(500).send()
  }
}

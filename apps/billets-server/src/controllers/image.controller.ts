import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import {
  GetImageResizeQueryStringDTO,
  GetImageResizeQueryStringDTOSchema,
  UploadImageBodyDTO,
  UploadImageResponseDTO,
} from '@/dtos/image.dto'
import { S3Client } from '@/lib/s3-client'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import sharp from 'sharp'

interface GetImageResizeRoute extends RouteGenericInterface {
  Querystring: GetImageResizeQueryStringDTO
  Reply: {
    200: Buffer
    304: Buffer
    400: ErrorResponseDTO
    404: ErrorResponseDTO
    500: ErrorResponseDTO
  }
}

export const getImageResizeHandler = async (
  req: FastifyRequest<GetImageResizeRoute>,
  rep: FastifyReply<GetImageResizeRoute>,
) => {
  try {
    const queryValidation = GetImageResizeQueryStringDTOSchema.safeParse(req.query)
    if (!queryValidation.success) {
      return rep.status(400).send({ code: 'INVALID_QUERY_STRING', message: 'Invalid query string' })
    }

    const { key: originalKey, format } = queryValidation.data

    if (!originalKey) return rep.status(400).send({ code: 'IMAGE_KEY_NOT_FOUND', message: 'Image key is required' })

    const originalImage = await new S3Client()
      .setGetObjectCommand(
        new GetObjectCommand({
          Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
          Key: originalKey,
        }),
      )
      .get()

    if (!originalImage || !originalImage.Body) {
      return rep.status(404).send({ code: 'IMAGE_NOT_FOUND', message: 'Image not found' })
    }

    const originalImageBuffer = await originalImage.Body.transformToByteArray()

    return rep
      .headers({
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `"${originalKey}"`,
      })
      .status(200)
      .send(Buffer.from(originalImageBuffer))
  } catch (err) {
    console.error(err)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

type UploadImageRoute = RouteGenericInterface & {
  Body: UploadImageBodyDTO
  Reply: {
    200: UploadImageResponseDTO
    500: ErrorResponseDTO
  }
}

export const uploadImageHandler = async (
  req: FastifyRequest<UploadImageRoute>,
  rep: FastifyReply<UploadImageRoute>,
) => {
  try {
    const { imageUrl, resolution, concertId, index } = req.body
    const quality = resolution === 'low' ? 50 : resolution === 'medium' ? 70 : 90
    const fetchedDetailImage = await fetch(imageUrl)
    const buffer = await fetchedDetailImage.arrayBuffer()

    const imageBuffer = await sharp(buffer).toFormat('webp', { quality }).toBuffer()
    const key = `coldsurf/event/${concertId}/detail-image-${index}-${resolution}.webp`
    await new S3Client()
      .setPutObjectCommand(
        new PutObjectCommand({
          Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
          Key: key,
          Body: imageBuffer,
          ContentType: `image/webp`,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      )
      .put()

    return rep.status(200).send({ key })
  } catch (error) {
    console.error(error)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

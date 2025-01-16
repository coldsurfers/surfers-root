import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { GetImageResizeQueryStringDTO, GetImageResizeQueryStringDTOSchema } from '@/dtos/image.dto'
import { S3Client } from '@/lib/s3-client'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import sharp, { FormatEnum } from 'sharp'

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

const DEFAULT_SIZE = 512
const DEFAULT_FORMAT = 'png'

export const getImageResizeHandler = async (
  req: FastifyRequest<GetImageResizeRoute>,
  rep: FastifyReply<GetImageResizeRoute>,
) => {
  try {
    const queryValidation = GetImageResizeQueryStringDTOSchema.safeParse(req.query)
    if (!queryValidation.success) {
      return rep.status(400).send({ code: 'INVALID_QUERY_STRING', message: 'Invalid query string' })
    }

    const { key, width, height, format } = queryValidation.data

    if (!key) return rep.status(400).send({ code: 'IMAGE_KEY_NOT_FOUND', message: 'Image key is required' })

    const targetWidth = width || DEFAULT_SIZE
    const targetHeight = height || DEFAULT_SIZE
    const targetFormat = format || DEFAULT_FORMAT

    const cacheKey = `${key}-${targetWidth}x${targetHeight}.${targetFormat}`

    try {
      const cachedImage = await new S3Client()
        .setGetObjectCommand(
          new GetObjectCommand({
            Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
            Key: cacheKey,
          }),
        )
        .get()

      const { Body: cachedImageBody } = cachedImage

      if (!cachedImageBody) {
        console.log('CachedImageBody Not Found')
        throw Error('Cached image not found')
      }

      return rep
        .headers({
          'Content-Type': `image/${targetFormat}`,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'ETag': `"${cacheKey}"`,
        })
        .status(304)
        .send(Buffer.from(await cachedImageBody.transformToByteArray()))
    } catch (e) {
      console.error(e)
      console.log('Cache miss, resizing image...')
    }

    const originalImage = await new S3Client()
      .setGetObjectCommand(
        new GetObjectCommand({
          Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
          Key: key,
        }),
      )
      .get()

    if (!originalImage || !originalImage.Body) {
      return rep.status(404).send({ code: 'IMAGE_NOT_FOUND', message: 'Image not found' })
    }

    const originalImageBuffer = await originalImage.Body.transformToByteArray()

    const processedImage = await sharp(originalImageBuffer)
      .resize(targetWidth, targetHeight)
      .toFormat(targetFormat as keyof FormatEnum)
      .toBuffer()

    await new S3Client()
      .setPutObjectCommand(
        new PutObjectCommand({
          Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
          Key: cacheKey,
          Body: processedImage,
          ContentType: `image/${targetFormat}`,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      )
      .put()

    return rep
      .headers({
        'Content-Type': `image/${targetFormat}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `"${cacheKey}"`,
      })
      .status(200)
      .send(processedImage)
  } catch (err) {
    console.error(err)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

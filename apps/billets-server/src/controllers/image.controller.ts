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

const DEFAULT_FORMAT = 'png'

function generateCacheKey({
  originalKey,
  targetWidth,
  targetHeight,
  targetFormat,
}: {
  originalKey: string
  targetWidth: number
  targetHeight: number
  targetFormat: string
}) {
  return `${originalKey}-${targetWidth}x${targetHeight}.${targetFormat}`
}

async function getCachedImage({
  originalKey,
  targetWidth,
  targetHeight,
  targetFormat,
}: {
  originalKey: string
  targetWidth: number
  targetHeight: number
  targetFormat: string
}) {
  const cacheKey = generateCacheKey({
    originalKey,
    targetWidth,
    targetHeight,
    targetFormat,
  })
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

    return {
      cacheKey,
      cachedImageBody,
    }
  } catch (e) {
    console.error(e)
    console.log('Cache miss, resizing image...')
    return {
      cacheKey: null,
      cachedImageBody: null,
    }
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

    const { key: originalKey, width, height, format } = queryValidation.data

    if (!originalKey) return rep.status(400).send({ code: 'IMAGE_KEY_NOT_FOUND', message: 'Image key is required' })

    const targetWidth = width
    const targetHeight = height
    const targetFormat = format || DEFAULT_FORMAT

    const isCacheAvailable = typeof targetWidth === 'number' && typeof targetHeight === 'number'

    if (isCacheAvailable) {
      const { cacheKey: oldCacheKey, cachedImageBody } = await getCachedImage({
        originalKey,
        targetWidth,
        targetHeight,
        targetFormat,
      })
      if (cachedImageBody) {
        return rep
          .headers({
            'Content-Type': `image/${targetFormat}`,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'ETag': `"${oldCacheKey}"`,
          })
          .status(200)
          .send(Buffer.from(await cachedImageBody.transformToByteArray()))
      }
    }

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

    const processedImage = await sharp(originalImageBuffer)
      .resize(targetWidth, targetHeight, { fit: 'contain' })
      .toFormat(targetFormat as keyof FormatEnum, { quality: 70 })
      .toBuffer()

    const key = isCacheAvailable
      ? generateCacheKey({
          originalKey,
          targetWidth,
          targetHeight,
          targetFormat,
        })
      : originalKey

    if (isCacheAvailable) {
      // store cache imaged based on cacheKey
      await new S3Client()
        .setPutObjectCommand(
          new PutObjectCommand({
            Bucket: process.env.COLDSURF_AWS_S3_BUCKET ?? '',
            Key: key,
            Body: processedImage,
            ContentType: `image/${targetFormat}`,
            CacheControl: 'public, max-age=31536000, immutable',
          }),
        )
        .put()
    }

    return rep
      .headers({
        'Content-Type': `image/${targetFormat}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `"${key}"`,
      })
      .status(200)
      .send(processedImage)
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

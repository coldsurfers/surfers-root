import { ErrorResponseDTO } from '@/dtos/error-response.dto'
import { GetImageResizeQueryStringDTO, GetImageResizeQueryStringDTOSchema } from '@/dtos/image.dto'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { RouteGenericInterface } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import sharp, { FormatEnum } from 'sharp'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
})

interface GetImageResizeRoute extends RouteGenericInterface {
  Querystring: GetImageResizeQueryStringDTO
  Reply: {
    200: Buffer
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

    const { key, width, height, format } = queryValidation.data

    if (!key) return rep.status(400).send({ code: 'IMAGE_KEY_NOT_FOUND', message: 'Image key is required' })

    const targetWidth = width || null
    const targetHeight = height || null
    const targetFormat = format || 'jpeg'

    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET ?? '',
      Key: key,
    })

    const { Body: originalImage } = await s3.send(getObjectCommand)

    if (!originalImage) {
      return rep.status(404).send({ code: 'IMAGE_NOT_FOUND', message: 'Image not found' })
    }

    // Resize image using Sharp
    const processedImage = await sharp(await originalImage.transformToByteArray())
      .resize(targetWidth, targetHeight)
      .toFormat(targetFormat as keyof FormatEnum)
      .toBuffer()

    // Return processed image
    return rep.type(`image/${targetFormat}`).status(200).send(processedImage)
  } catch (err) {
    console.error(err)
    return rep.status(500).send({ code: 'UNKNOWN', message: 'internal server error' })
  }
}

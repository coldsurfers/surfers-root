import fs from 'fs'
import sha1 from 'sha1'
import axios from 'axios'
import util from 'util'
import stream from 'stream'
import FormData from 'form-data'
import { generateUUID } from '@coldsurfers/shared-utils'

const pipeline = util.promisify(stream.pipeline)

export const generateCloudinaryUploadSignature = (filename: string) => {
  const timestamp = Date.now()
  const directory = 'blog-assets'
  const public_id = `${directory}/${filename}`
  const payload_to_sign = `public_id=${public_id}&timestamp=${timestamp}`
  const api_secret = process.env.CLOUDINARY_API_SECRET
  const signature = sha1(payload_to_sign + api_secret)
  return {
    signature,
    public_id,
    timestamp,
  }
}

export const uploadCloudinary = async (url: string) => {
  const request = await axios.get(url, {
    responseType: 'stream',
  })
  if (!fs.existsSync('temps')) {
    fs.mkdirSync('temps')
  }
  const filepath = `temps/${generateUUID()}`
  await pipeline(request.data, fs.createWriteStream(filepath))
  const { signature, public_id, timestamp } =
    generateCloudinaryUploadSignature(generateUUID())

  const cloudinarySignedUploadAPI =
    'https://api.cloudinary.com/v1_1/druidbphk/image/upload'
  const formdata = new FormData()

  formdata.append('file', fs.createReadStream(filepath))
  formdata.append('public_id', public_id)
  formdata.append('signature', signature)
  formdata.append('api_key', process.env.CLOUDINARY_API_KEY)
  formdata.append('timestamp', timestamp)

  const { data } = await axios({
    method: 'post',
    url: cloudinarySignedUploadAPI,
    headers: formdata.getHeaders(),
    data: formdata,
  })
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath)
  }
  return data
}

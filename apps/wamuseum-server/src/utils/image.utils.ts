import { IMAGE_API_URL } from '../libs/constants'

export const generateImageApiUrl = (key: string) => {
  return `${IMAGE_API_URL}?key=${key}`
}

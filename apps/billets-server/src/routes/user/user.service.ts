import UserDTO from '@/dtos/UserDTO'
import { decodeToken } from '@/lib/jwt'

export const findUserByAccessToken = async (accessToken: string) => {
  try {
    const decoded = decodeToken(accessToken)
    if (!decoded) {
      return null
    }
    const userDTO = await UserDTO.findById(decoded.id)
    return userDTO
  } catch (e) {
    console.error(e)
    return null
  }
}

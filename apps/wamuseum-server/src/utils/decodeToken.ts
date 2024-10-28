import jwtDecode from 'jwt-decode'
import { FstvlLifeJwtPayload } from '../types'

export default function decodeToken(token: string) {
  try {
    const decoded = jwtDecode<FstvlLifeJwtPayload>(token)
    return decoded
  } catch (e) {
    return null
  }
}

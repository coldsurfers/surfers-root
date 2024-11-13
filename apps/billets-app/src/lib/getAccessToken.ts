import AsyncStorage from '@react-native-async-storage/async-storage'
import { storageAuthTokenKey } from './contexts/constants'

export default async function getAccessToken() {
  const token = await AsyncStorage.getItem(storageAuthTokenKey)
  if (!token) {
    return null
  }
  try {
    const parsedToken = JSON.parse(token) as {
      accessToken: string
      refreshToken: string
    }
    return parsedToken.accessToken
  } catch (e) {
    return null
  }
}

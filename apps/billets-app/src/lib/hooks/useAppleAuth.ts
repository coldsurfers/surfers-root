import appleAuth from '@invertase/react-native-apple-authentication'
import { useEffect } from 'react'
import { Platform } from 'react-native'

const useAppleAuth = () => {
  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return
    }
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked')
    })
  }, [])
}

export default useAppleAuth

import appleAuth from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Button, IconButton, Spinner, palette } from 'fstvllife-design-system'
import React, { useCallback, useContext } from 'react'
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native'
import { GOOGLE_SIGNIN_OPTIONS } from '../lib/constants'
import { AuthContext } from '../lib/contexts/AuthContext'
import { ToastVisibleContext, ToastVisibleContextProvider } from '../lib/contexts/ToastVisibleContext'
import decodeJwt from '../lib/decodeJwt'
import useSignInMutation from '../lib/hooks/mutations/useSignInMutation'
import palettes from '../lib/palettes'
import { useLoginSelectionScreenNavigation } from './LoginSelectionScreen.hooks'

const GOOGLE_COLOR = '#4284F3'

GoogleSignin.configure({
  scopes: [], // what API you want to access on behalf of the user, default is email and profile
  webClientId: GOOGLE_SIGNIN_OPTIONS.webClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: GOOGLE_SIGNIN_OPTIONS.iosClientId, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
})

const LoginSelectionScreen = () => {
  const { show } = useContext(ToastVisibleContext)
  const { login } = useContext(AuthContext)
  const { goBack, navigate } = useLoginSelectionScreenNavigation()
  const { mutate: mutateSignIn, isPending: isPendingMutateSignIn } = useSignInMutation({
    onSuccess: (data) => {
      if (!data) {
        return
      }
      const { user, authToken } = data
      login({ user, authToken })
    },
  })
  const onPressBackButton = useCallback(() => {
    goBack()
  }, [goBack])

  const onPressEmailLogin = useCallback(() => {
    navigate('EmailLoginScreen', {})
  }, [navigate])

  const onPressGoogleLogin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const user = await GoogleSignin.signIn()
      const {
        user: { email },
      } = user
      if (!user.idToken) {
        return
      }
      mutateSignIn(
        {
          provider: 'google',
          email,
          token: user.idToken,
        },
        {
          onError: () =>
            show({
              autoHide: true,
              duration: 5000,
              message: '구글 로그인 중 오류가 발생했어요',
            }),
        },
      )
    } catch (e) {
      console.error(e)
    }
  }, [mutateSignIn, show])

  const onPressAppleLogin = useCallback(async () => {
    if (Platform.OS !== 'ios') {
      return
    }
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { email: appleEmail, identityToken } = appleAuthRequestResponse
        if (!identityToken) {
          return
        }
        const email = appleEmail ?? decodeJwt(identityToken)?.email
        if (!email) {
          return
        }
        mutateSignIn(
          {
            provider: 'apple',
            email: email,
            token: identityToken,
          },
          {
            onError: () =>
              show({
                type: 'error',
                message: '애플 로그인 중 오류가 발생했어요',
                autoHide: true,
                duration: 5000,
              }),
          },
        )
      }
    } catch (e) {
      console.error(e)
    }
  }, [mutateSignIn, show])

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <IconButton
          onPress={onPressBackButton}
          color="transparentDarkGray"
          icon="✘"
          style={styles.closeButtonPosition}
        />
        <View style={styles.loginBox}>
          <Button
            text="이메일로 계속하기"
            style={[
              styles.loginButton,
              {
                backgroundColor: palettes.lightblue[300],
              },
            ]}
            onPress={onPressEmailLogin}
          />
          {Platform.OS === 'ios' && (
            <Button
              text="   Apple로 계속하기"
              style={[
                styles.loginButton,
                {
                  backgroundColor: palette.black,
                },
              ]}
              onPress={onPressAppleLogin}
            />
          )}
          <Button
            text="Google로 계속하기"
            style={[
              styles.loginButton,
              {
                backgroundColor: GOOGLE_COLOR,
              },
            ]}
            onPress={onPressGoogleLogin}
          />
        </View>
        {isPendingMutateSignIn ? <Spinner /> : null}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  closeButtonPosition: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
  loginButton: {
    width: 180,
    marginBottom: 12,
  },
})

const LoginSelectionScreenWithToast = () => {
  return (
    <ToastVisibleContextProvider>
      <LoginSelectionScreen />
    </ToastVisibleContextProvider>
  )
}

export default LoginSelectionScreenWithToast

import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { Button, IconButton, Spinner, TextInput } from '@coldsurfers/ocean-road/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from 'react-native'
import { AuthContext } from '../lib/contexts/auth-context/auth-context'
import { ToastVisibleContext, ToastVisibleContextProvider } from '../lib/contexts/ToastVisibleContext'
import useSignInMutation from '../lib/hooks/mutations/useSignInMutation'
import { useEmailLoginScreenNavigation } from './EmailLoginScreen.hooks'

const EmailLoginScreen = () => {
  const { show } = useContext(ToastVisibleContext)
  const { login } = useContext(AuthContext)
  const { navigate, goBack } = useEmailLoginScreenNavigation()
  const { mutate, isPending: isPendingSignIn, error } = useSignInMutation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onPressSignup = useCallback(() => {
    navigate('EmailSignupScreen', {})
  }, [navigate])

  const onPressSignIn = useCallback(() => {
    if (!email) {
      show({
        type: 'warning',
        message: '이메일을 입력해주세요',
        autoHide: true,
        duration: 3000,
      })
      return
    }
    if (!password) {
      show({
        type: 'warning',
        message: '비밀번호를 입력해주세요',
        autoHide: true,
        duration: 3000,
      })
      return
    }
    mutate(
      {
        provider: 'email',
        email,
        password,
      },
      {
        onSuccess: (signInData) => {
          if (!signInData) return
          const { authToken, user } = signInData
          if (authToken) {
            login({
              authToken,
              user,
            }).then(() => {
              navigate('MainTabScreen', {
                screen: 'HomeStackScreen',
                params: {
                  screen: 'HomeScreen',
                  params: {},
                },
              })
            })
          }
        },
      },
    )
  }, [email, login, mutate, navigate, password, show])

  useEffect(() => {
    if (error && error) {
      show({
        type: 'error',
        message: '이메일 로그인에 실패했어요.',
        autoHide: true,
        duration: 5000,
      })
    }
  }, [error, show])

  // useEffect(() => {
  //   if (!isPendingSignIn && signInData) {
  //   }
  // }, [isPendingSignIn, login, signInData]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <IconButton icon="←" onPress={goBack} theme="transparentDarkGray" style={styles.backButton} />
      <KeyboardAvoidingView style={styles.innerWrapper} behavior="padding">
        <View style={styles.formWrapper}>
          <TextInput placeholder="이메일" onChangeText={(text) => setEmail(text)} autoCapitalize="none" />
          <TextInput
            placeholder="비밀번호"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.textInputSpace}
          />
          <Button onPress={onPressSignIn} style={styles.buttonSpace}>
            로그인하기
          </Button>
          <Button theme="pink" onPress={onPressSignup} style={styles.buttonSpace}>
            이메일로 가입하기
          </Button>
        </View>
      </KeyboardAvoidingView>
      {isPendingSignIn ? <Spinner /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.oc.white.value,
  },
  backButton: {
    marginLeft: 16,
  },
  innerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: 280,
  },
  textInputSpace: {
    marginTop: 12,
  },
  buttonSpace: {
    marginTop: 12,
  },
})

const EmailLoginScreenWithToastProvider = () => {
  return (
    <ToastVisibleContextProvider>
      <EmailLoginScreen />
    </ToastVisibleContextProvider>
  )
}

export default EmailLoginScreenWithToastProvider

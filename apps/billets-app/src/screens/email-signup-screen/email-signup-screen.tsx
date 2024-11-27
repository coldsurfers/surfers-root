import { ToastVisibleContext, ToastVisibleContextProvider, validateEmail } from '@/lib'
import useSendEmailConfirmMutation from '@/lib/react-query/mutations/useSendEmailConfirmMutation'
import color from '@coldsurfers/design-tokens/dist/js/color/variables'
import { Button, IconButton, Spinner, TextInput } from '@coldsurfers/ocean-road/native'
import React, { useCallback, useContext, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useEmailSignupScreenNavigation } from './email-signup-screen.hooks'

const _EmailSignupScreen = () => {
  const { show } = useContext(ToastVisibleContext)
  const { goBack, navigate } = useEmailSignupScreenNavigation()
  const { mutate, isPending: isPendingSendConfirmEmail } = useSendEmailConfirmMutation({
    onSuccess: (data) => {
      if (!data) {
        return
      }
      navigate('EmailConfirmScreen', {
        email: data.email,
      })
    },
    onError: (error) => {
      let message = '알 수 없는 오류가 발생했어요'
      if (error.status === 409) {
        message = error.message
      }
      show({
        autoHide: true,
        duration: 2000,
        message,
        type: 'error',
      })
    },
  })
  const [email, setEmail] = useState<string>('')
  const [validated, setValidated] = useState<boolean>(false)
  const onPressNext = useCallback(() => {
    mutate({ email })
  }, [mutate, email])
  const onChangeText = useCallback((text: string) => {
    setEmail(text)
    setValidated(validateEmail(text) !== null)
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <IconButton onPress={goBack} icon="←" theme="transparentDarkGray" style={styles.backButton} />
      <TextInput
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholder="이메일을 입력해주세요"
        style={styles.textInput}
      />
      <Button style={styles.button} onPress={onPressNext} disabled={!validated}>
        다음으로 이동하기
      </Button>
      {isPendingSendConfirmEmail && <Spinner />}
    </SafeAreaView>
  )
}

export const EmailSignupScreen = () => {
  return (
    <ToastVisibleContextProvider>
      <_EmailSignupScreen />
    </ToastVisibleContextProvider>
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
  textInput: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  button: {
    marginTop: 12,
    marginHorizontal: 16,
  },
})

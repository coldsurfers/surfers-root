import { colors } from '@coldsurfers/ocean-road'
import { Button, IconButton, Spinner, TextInput } from '@coldsurfers/ocean-road/native'
import React, { useCallback, useContext, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { AuthContext } from '../../lib/contexts/auth-context/auth-context'
import {
  ToastVisibleContext,
  ToastVisibleContextProvider,
} from '../../lib/contexts/toast-visible-context/toast-visible-context'
import palettes from '../../lib/palettes'
import useSignupEmailMutation from '../../lib/react-query/mutations/useSignupEmailMutation'
import useUpdateEmailConfirmMutation from '../../lib/react-query/mutations/useUpdateEmailConfirmMutation'
import { useEmailConfirmScreenNavigation, useEmailConfirmScreenRoute } from './email-confirm-screen.hooks'

export const EmailConfirmScreen = () => {
  const { params } = useEmailConfirmScreenRoute()
  const { show } = useContext(ToastVisibleContext)
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [confirmText, setConfirmText] = useState<string>('')
  const [passwordText, setPasswordText] = useState<string>('')
  const [passwordConfirmText, setPasswordConfirmText] = useState<string>('')
  const { goBack } = useEmailConfirmScreenNavigation()
  const { login } = useContext(AuthContext)
  const { mutate: mutateEmailConfirm, isPending: isLoadingEmailConfirm } = useUpdateEmailConfirmMutation({
    onSuccess: (data) => {
      if (!data) {
        return
      }
      show({
        autoHide: true,
        duration: 2000,
        message: '이메일 인증이 완료되었어요',
      })
      setConfirmed(true)
    },
    onError: (error) => {
      show({
        autoHide: true,
        duration: 2000,
        message: error.message,
        type: 'error',
      })
    },
  })
  const { mutate: mutateSignupEmail, isPending: isLoadingSignupEmail } = useSignupEmailMutation({
    onSuccess: (data) => {
      if (!data) {
        return
      }
      const { authToken, user } = data
      login({ user, authToken }).then(() => {
        show({
          autoHide: true,
          duration: 2000,
          message: '회원가입이 완료되었어요!🎉',
        })
      })
    },
    onError: () => {
      show({
        type: 'error',
        message: '가입 도중 오류가 발생했어요',
        autoHide: true,
        duration: 5000,
      })
    },
  })

  const onChangeConfirmText = useCallback((text: string) => {
    setConfirmText(text)
  }, [])

  const onChangePasswordText = useCallback((text: string) => {
    setPasswordText(text)
  }, [])

  const onChangePasswordConfirmText = useCallback((text: string) => {
    setPasswordConfirmText(text)
  }, [])

  const onPressConfirm = useCallback(() => {
    if (isLoadingEmailConfirm) {
      return
    }
    mutateEmailConfirm({
      email: params.email,
      authCode: confirmText,
    })
  }, [confirmText, isLoadingEmailConfirm, mutateEmailConfirm, params.email])

  const onPressSignup = useCallback(() => {
    if (isLoadingSignupEmail) {
      return
    }
    if (passwordText !== passwordConfirmText) {
      show({
        message: '두 비밀번호를 같게 입력해주세요',
        type: 'warning',
        autoHide: true,
        duration: 5000,
      })
      return
    }
    if (passwordText.length < 8 || passwordText.length > 30) {
      show({
        message: '비밀번호의 길이는 최소 8자 이상, 최대 30자까지만 가능해요',
        type: 'warning',
        autoHide: true,
        duration: 5000,
      })
      return
    }
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
    if (!regex.test(passwordText)) {
      show({
        message: '비밀번호는 최소 1개 이상의 대소문자와 숫자, 특수문자를 포함해야 해요',
        type: 'warning',
        autoHide: true,
        duration: 5000,
      })
      return
    }
    mutateSignupEmail({
      email: params.email,
      password: passwordText,
      provider: 'email',
    })
  }, [isLoadingSignupEmail, mutateSignupEmail, params.email, passwordConfirmText, passwordText, show])

  return (
    <ToastVisibleContextProvider>
      <SafeAreaView style={styles.wrapper}>
        <IconButton icon="←" theme="transparentDarkGray" onPress={goBack} style={styles.backButton} />
        {confirmed ? (
          <>
            <TextInput
              placeholder="비밀번호를 입력해주세요"
              style={styles.textInput}
              onChangeText={onChangePasswordText}
              secureTextEntry
              autoCapitalize="none"
            />
            <TextInput
              placeholder="비밀번호 확인"
              style={styles.textInput}
              onChangeText={onChangePasswordConfirmText}
              secureTextEntry
              autoCapitalize="none"
            />
          </>
        ) : (
          <TextInput
            placeholder="인증번호를 입력해주세요"
            keyboardType="number-pad"
            style={styles.textInput}
            editable={!confirmed}
            onChangeText={onChangeConfirmText}
          />
        )}

        <Button
          style={[
            {
              backgroundColor: palettes.lightblue[400],
            },
            styles.button,
          ]}
          onPress={confirmed ? onPressSignup : onPressConfirm}
        >
          {confirmed ? '비밀번호 설정하기' : '인증하기'}
        </Button>
        {isLoadingEmailConfirm && <Spinner />}
      </SafeAreaView>
    </ToastVisibleContextProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.oc.white.value,
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

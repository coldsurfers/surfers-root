import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { Button } from '../../Button'
import { variables } from '../../lib/tokens/ts/variables'
import { Text } from '../../Text'
import { TextInput } from '../../TextInput'
import { LoginFormRefHandle } from './types'

const { palette } = variables

interface Props {
  onPressLoginButton: (params: { email: string; password: string }) => void
  withRequestButtonUI?: boolean
  onPressRequestButtonUI?: () => void
  onPressCreateAccountButtonUI?: () => void
  formTitle?: string
}

const LoginForm = forwardRef<LoginFormRefHandle, Props>(
  (
    { onPressLoginButton, withRequestButtonUI, onPressRequestButtonUI, onPressCreateAccountButtonUI, formTitle },
    ref,
  ) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useImperativeHandle(ref, () => ({
      currentInputValue() {
        return {
          email,
          password,
        }
      },
    }))

    return (
      <View>
        <Text
          weight="bold"
          style={{
            fontSize: 18,
            marginBottom: 14,
          }}
        >
          {formTitle}
        </Text>
        <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="이메일" style={{ width: 300 }} />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="패스워드"
          secureTextEntry
          style={{ width: 300, marginTop: 14 }}
        />
        <Button
          text="로그인"
          onPress={useCallback(() => {
            onPressLoginButton({ email, password })
          }, [email, onPressLoginButton, password])}
          style={{ marginTop: 14 }}
        />
        <Button
          text="계정 만들기"
          onPress={onPressCreateAccountButtonUI}
          style={{ marginTop: 14, backgroundColor: palette.black }}
        />
        {withRequestButtonUI && (
          <Button
            text="가입 요청하기"
            onPress={onPressRequestButtonUI}
            style={{ marginTop: 14, backgroundColor: palette.black }}
          />
        )}
      </View>
    )
  },
)

export default LoginForm

import { Button, Text, TextInput } from '@coldsurfers/ocean-road'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { LoginFormRefHandle } from './login-form.types'

interface Props {
  onPressLoginButton: (params: { email: string; password: string }) => void
  withRequestButtonUI?: boolean
  onPressRequestButtonUI?: () => void
  onPressCreateAccountButtonUI?: () => void
  formTitle?: string
}

export const LoginForm = forwardRef<LoginFormRefHandle, Props>(
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
      <div>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 14,
            fontWeight: 'bold',
          }}
        >
          {formTitle}
        </Text>
        <TextInput
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일"
          style={{ width: 300 }}
        />
        <TextInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="패스워드"
          type="password"
          style={{ width: 300, marginTop: 14 }}
        />
        <Button
          onClick={useCallback(() => {
            onPressLoginButton({ email, password })
          }, [email, onPressLoginButton, password])}
          style={{ marginTop: 14 }}
        >
          로그인
        </Button>
        <Button onClick={onPressCreateAccountButtonUI} style={{ marginTop: 14 }}>
          계정 만들기
        </Button>
        {withRequestButtonUI && (
          <Button onClick={onPressRequestButtonUI} style={{ marginTop: 14 }}>
            가입 요청하기
          </Button>
        )}
      </div>
    )
  },
)

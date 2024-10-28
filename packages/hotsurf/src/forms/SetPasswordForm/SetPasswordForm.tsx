import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { Button } from '../../Button'
import { Text } from '../../Text'
import { TextInput } from '../../TextInput'
import { SetPasswordFormRefHandle } from './types'

interface Props {
  onPressSetPasswordButton: (params: { password: string }) => void
  formTitle?: string
}

const SetPasswordForm = forwardRef<SetPasswordFormRefHandle, Props>(({ onPressSetPasswordButton, formTitle }, ref) => {
  const [password, setPassword] = useState<string>('')

  useImperativeHandle(ref, () => ({
    currentInputValue() {
      return {
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
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="패스워드"
        style={{ width: 300, marginTop: 14 }}
      />
      <Button
        text="패스워드 정하기"
        onPress={useCallback(() => {
          onPressSetPasswordButton({ password })
        }, [onPressSetPasswordButton, password])}
        style={{ marginTop: 14 }}
      />
    </View>
  )
})

export default SetPasswordForm

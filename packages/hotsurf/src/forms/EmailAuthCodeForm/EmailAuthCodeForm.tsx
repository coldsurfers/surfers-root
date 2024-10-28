import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { Button } from '../../Button'
import { Text } from '../../Text'
import { TextInput } from '../../TextInput'
import { EmailAuthCodeFormRefHandle } from './types'

interface Props {
  onPressAuthCodeButton: (params: { authcode: string }) => void
  formTitle?: string
}

const EmailAuthCodeForm = forwardRef<EmailAuthCodeFormRefHandle, Props>(({ onPressAuthCodeButton, formTitle }, ref) => {
  const [authcode, setAuthcode] = useState<string>('')

  useImperativeHandle(ref, () => ({
    currentInputValue() {
      return {
        authcode,
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
        value={authcode}
        onChangeText={(text) => setAuthcode(text)}
        placeholder="인증번호"
        style={{ width: 300 }}
      />
      <Button
        text="인증하기"
        onPress={useCallback(() => {
          onPressAuthCodeButton({ authcode })
        }, [authcode, onPressAuthCodeButton])}
        style={{ marginTop: 14 }}
      />
    </View>
  )
})

export default EmailAuthCodeForm

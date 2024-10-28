import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { Button } from '../../Button'
import { Text } from '../../Text'
import { TextInput } from '../../TextInput'
import { SendEmailFormRefHandle } from './types'

interface Props {
  onPressSendEmailButton: (params: { email: string }) => void
  formTitle?: string
}

const SendEmailForm = forwardRef<SendEmailFormRefHandle, Props>(({ onPressSendEmailButton, formTitle }, ref) => {
  const [email, setEmail] = useState<string>('')

  useImperativeHandle(ref, () => ({
    currentInputValue() {
      return {
        email,
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
      <Button
        text="이메일 인증하기"
        onPress={useCallback(() => {
          onPressSendEmailButton({ email })
        }, [email, onPressSendEmailButton])}
        style={{ marginTop: 14 }}
      />
    </View>
  )
})

export default SendEmailForm

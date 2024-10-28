import { TextInput } from '@coldsurfers/hotsurf'
import { useCallback } from 'react'

interface Props {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

const UploadFormDateInput = ({ value, onChangeText, placeholder }: Props) => {
  const handleChangeText = useCallback(
    (text: string) => {
      const nextText = text
      if (nextText.length > 10) {
        return
      }
      onChangeText(text)
    },
    [onChangeText]
  )
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={handleChangeText}
    />
  )
}

export default UploadFormDateInput

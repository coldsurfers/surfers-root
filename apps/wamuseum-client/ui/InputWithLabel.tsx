import { memo } from 'react'
import styled from 'styled-components'
import { TextInput } from '@coldsurfers/hotsurf'
import Label from './Label'

const InputWithLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  flex: 1;
`

const InputWithLabel = memo(
  ({
    value,
    onChangeText,
    label,
    placeholder,
  }: {
    value: string
    // eslint-disable-next-line no-unused-vars
    onChangeText: (text: string) => void
    label: string
    placeholder?: string
  }) => (
    <InputWithLabelWrapper>
      <Label>{label}</Label>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </InputWithLabelWrapper>
  )
)

InputWithLabel.displayName = 'InputWithLabel'

export default InputWithLabel

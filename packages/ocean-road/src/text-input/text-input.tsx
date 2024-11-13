import { forwardRef } from 'react'
import { StyledTextInputContainer } from './text-input.styled'
import { TextInputProps } from './text-input.types'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <StyledTextInputContainer ref={ref} {...props} />
})

import { forwardRef } from 'react'
import { StyledTextAreaContainer } from './text-area.styled'
import { TextAreaProps } from './text-area.types'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return <StyledTextAreaContainer ref={ref} {...props} />
})

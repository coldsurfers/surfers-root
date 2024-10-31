/* eslint-disable no-undef */
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => <input {...props} ref={ref} />)

export default Input

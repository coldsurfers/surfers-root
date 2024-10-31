/* eslint-disable no-undef */
import styled from 'styled-components'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface ButonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const ButtonBase = styled.button`
  border-radius: 14px;
  padding: 0.5rem;
  border: none;
  font-size: 14px;
  cursor: pointer;
`

export default function Button(props: ButonProps) {
  return <ButtonBase {...props} />
}

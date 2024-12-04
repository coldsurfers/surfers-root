import { PropsWithChildren } from 'react'

export type ButtonProps = PropsWithChildren<{
  theme?: ButtonTheme
  size?: 'md' | 'sm'
}>

export type ButtonTheme = 'transparent' | 'transparentDarkGray' | 'white' | 'pink' | 'indigo'

import { PropsWithChildren } from 'react'

export type ButtonProps = PropsWithChildren<{
  theme?: ButtonTheme
}>

export type ButtonTheme = 'transparent' | 'transparentDarkGray' | 'white' | 'pink' | 'indigo'

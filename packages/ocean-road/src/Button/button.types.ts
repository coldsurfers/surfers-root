import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export type ButtonProps = PropsWithChildren<
  {
    theme?: ButtonTheme
  } & ButtonHTMLAttributes<HTMLButtonElement>
>

export type ButtonTheme = 'transparent' | 'transparentDarkGray' | 'white' | 'pink' | 'indigo'

'use client'

import { useLinkStore } from '@/features'
import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, MouseEventHandler, PropsWithChildren, useCallback } from 'react'
import { useShallow } from 'zustand/shallow'

export function GlobalLink({
  children,
  href,
  onClick,
  target,
  ...otherProps
}: PropsWithChildren<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const { setIsLoading } = useLinkStore(useShallow((state) => ({ setIsLoading: state.setIsLoading })))
  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      if (!target) {
        setIsLoading(true)
      }
      onClick?.(e)
    },
    [onClick, setIsLoading, target],
  )
  return (
    <Link href={href} target={target} onClick={handleClick} {...otherProps}>
      {children}
    </Link>
  )
}

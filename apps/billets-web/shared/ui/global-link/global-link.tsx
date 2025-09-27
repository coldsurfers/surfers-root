'use client';

import { useLinkStore } from '@/features';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import {
  type AnchorHTMLAttributes,
  type MouseEventHandler,
  type PointerEventHandler,
  type PropsWithChildren,
  useCallback,
} from 'react';
import { useShallow } from 'zustand/shallow';

export function GlobalLink({
  children,
  href,
  onClick,
  target,
  ...otherProps
}: PropsWithChildren<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const pathname = usePathname();
  const { setIsLoading } = useLinkStore(
    useShallow((state) => ({ setIsLoading: state.setIsLoading }))
  );
  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      const to = href;
      const from = pathname;
      if (!target && to !== from) {
        setIsLoading(true);
      }
      onClick?.(e);
    },
    [onClick, pathname, setIsLoading, target, href]
  );
  const onPointerDown = useCallback<PointerEventHandler<HTMLAnchorElement>>((e) => {
    e.preventDefault();
  }, []);

  return (
    <Link
      href={href}
      target={target}
      onClick={handleClick}
      {...otherProps}
      // or draggable={false}
      onPointerDown={onPointerDown}
    >
      {children}
    </Link>
  );
}

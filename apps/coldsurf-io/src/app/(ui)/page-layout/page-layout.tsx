'use client'

import { PropsWithChildren, useState } from 'react'
import { Header } from '../header'
import { MobileMenu } from '../mobile-menu'

export function PageLayout({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Header
        onClickMenuIcon={() => setIsOpen(true)}
        isMobileMenuOpen={isOpen}
        onClickCloseMobileMenuIcon={() => setIsOpen(false)}
      />
      <MobileMenu isOpen={isOpen} />
      {children}
    </>
  )
}

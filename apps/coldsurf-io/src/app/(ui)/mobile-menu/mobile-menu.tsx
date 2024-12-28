'use client'

import { AnimatePresence, Variants } from 'framer-motion'
import Link from 'next/link'
import { menuItems } from '../../(data)'
import { StyledMobileMenuBackground, StyledMobileMenuText } from './mobile-menu.styled'
import { MobileMenuProps } from './mobile-menu.types'

export function MobileMenu({ isOpen, onClickMenuItem }: MobileMenuProps) {
  // Animation variants
  const menuVariants: Variants = {
    hidden: {
      x: '100%', // Start off-screen to the right
    },
    visible: {
      x: 0, // Slide into view
      transition: {
        type: 'tween',
        duration: 0.25,
        stiffness: 60,
        damping: 12,
      },
    },
    exit: {
      x: '100%', // Slide out to the right
      transition: {
        type: 'tween',
        duration: 0.25,
        stiffness: 60,
        damping: 12,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledMobileMenuBackground initial="hidden" animate="visible" exit="exit" variants={menuVariants}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {menuItems.map((item) => {
              return (
                <li key={item.title} style={{ margin: '20px 0' }}>
                  <Link href={item.href} target={item.target} onClick={onClickMenuItem}>
                    <StyledMobileMenuText as="h3">{item.title}</StyledMobileMenuText>
                  </Link>
                </li>
              )
            })}
          </ul>
        </StyledMobileMenuBackground>
      )}
    </AnimatePresence>
  )
}

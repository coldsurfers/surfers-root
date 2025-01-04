'use client'

import { BILLETS_APP_URL } from '@/features'
import { Button, IconButton, Text } from '@coldsurfers/ocean-road'
import { AlignRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  HeaderContainer,
  HeaderLogo,
  HeaderMenuContainer,
  HeaderMenuText,
  HeaderTitle,
  MobileMenuContainer,
  ModalContainer,
  ModalContent,
  ModalPaper,
  WebMenuContainer,
} from './app-header.styled'

function ModalMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const { body } = document
    if (isOpen) {
      body.style.overflow = 'hidden' // Disable scrolling
    } else {
      body.style.overflow = '' // Reset overflow to enable scrolling
    }
    return () => {
      body.style.overflow = '' // Clean up on unmount
    }
  }, [isOpen])

  return (
    <ModalContainer onClick={onClose} $isOpen={isOpen} style={{ overflowY: 'auto' }}>
      {isOpen && (
        <ModalPaper onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            <Link href="/about" onClick={onClose} style={{ alignSelf: 'flex-start' }}>
              <Text as="p">About</Text>
            </Link>
            <Link href="https://blog.coldsurf.io" target="_blank" onClick={onClose} style={{ alignSelf: 'flex-start' }}>
              <Text as="p">Blog</Text>
            </Link>
            <Link href={BILLETS_APP_URL} onClick={onClose} style={{ margin: '0 auto' }}>
              <Button theme="border">GET THE APP</Button>
            </Link>
          </ModalContent>
        </ModalPaper>
      )}
    </ModalContainer>
  )
}

export function AppHeader() {
  const [animation, setAnimation] = useState<'show' | 'hide'>('show')
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    let lastScrollTop = 0
    const onScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop
      if (currentScroll > lastScrollTop) {
        setAnimation('hide')
      } else {
        setAnimation('show')
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll // For Mobile or negative scrolling
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <HeaderContainer $animation={animation}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Link href="/">
            <HeaderLogo src="/logo.png" alt="header_logo" />
          </Link>
          <Link href="/">
            <HeaderTitle as="h1">Billets</HeaderTitle>
          </Link>
        </div>
        <WebMenuContainer>
          <HeaderMenuContainer href="/about">
            <HeaderMenuText as="p">About</HeaderMenuText>
          </HeaderMenuContainer>
          <HeaderMenuContainer href="https://blog.coldsurf.io" target="_blank">
            <HeaderMenuText as="p">Blog</HeaderMenuText>
          </HeaderMenuContainer>
          <Link href={BILLETS_APP_URL}>
            <Button theme="border">GET THE APP</Button>
          </Link>
        </WebMenuContainer>
        <MobileMenuContainer>
          <IconButton onClick={() => setIsModalOpen(true)}>
            <AlignRight />
          </IconButton>
        </MobileMenuContainer>
      </HeaderContainer>
      <ModalMenu isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

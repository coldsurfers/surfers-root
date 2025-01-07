'use client'

import { BILLETS_APP_URL } from '@/features'
import { Button, IconButton, Text } from '@coldsurfers/ocean-road'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useEffect, useState } from 'react'
import {
  HeaderContainer,
  HeaderLogo,
  HeaderMenuContainer,
  HeaderMenuText,
  HeaderTitle,
  MobileMenuContainer,
  MobileMenuIcon,
  ModalContainer,
  ModalContent,
  ModalPaper,
  WebMenuContainer,
} from './app-header.styled'

const menuItems = [
  {
    link: '/browse',
    title: 'Browse events',
    target: undefined,
  },
  {
    link: '/about',
    title: 'About',
    target: undefined,
  },
  {
    link: 'https://blog.coldsurf.io',
    target: '_blank',
    title: 'Blog',
  },
] as const

function ModalMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()
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
            {menuItems.map((item) => {
              const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
                onClose()
                if (item.link === '/browse') {
                  e.preventDefault()
                  router.push('/browse/seoul')
                }
              }
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  target={item.target}
                  onClick={onClick}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <Text as="p">{item.title}</Text>
                </Link>
              )
            })}
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
  const router = useRouter()
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
          {menuItems.map((item) => {
            const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
              if (item.link === '/browse') {
                e.preventDefault()
                router.push('/browse/seoul')
              }
            }
            return (
              <HeaderMenuContainer key={item.link} href={item.link} onClick={onClick} target={item.target}>
                <HeaderMenuText as="p">{item.title}</HeaderMenuText>
              </HeaderMenuContainer>
            )
          })}
          <Link href={BILLETS_APP_URL}>
            <Button theme="border">GET THE APP</Button>
          </Link>
        </WebMenuContainer>
        <MobileMenuContainer>
          <IconButton onClick={() => setIsModalOpen(true)}>
            <MobileMenuIcon />
          </IconButton>
        </MobileMenuContainer>
      </HeaderContainer>
      <ModalMenu isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

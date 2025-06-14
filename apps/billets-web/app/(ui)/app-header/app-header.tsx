'use client'

import { APP_DOWNLOAD_WORDING, APP_STORE_URL } from '@/libs/constants'
import { useAuthStore } from '@/libs/stores'
import { authUtils } from '@/libs/utils/utils.auth'
import { breakpoints, Button, IconButton, Spinner, Text } from '@coldsurfers/ocean-road'
import { SERVICE_NAME } from '@coldsurfers/shared-utils'
import { useMutation } from '@tanstack/react-query'
import { Kaushan_Script } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useEffect, useState } from 'react'
import { ColorSchemeToggle } from '../color-scheme-toggle'
import { GlobalLink } from '../global-link'
import { AppHeaderSearchUI } from './app-header.search-ui'
import {
  HeaderContainer,
  HeaderLogo,
  HeaderMenuContainerButton,
  HeaderMenuContainerGlobalLink,
  HeaderMenuContainerLink,
  HeaderMenuText,
  HeaderTitle,
  MobileMenuContainer,
  MobileMenuIcon,
  ModalContainer,
  ModalContent,
  ModalPaper,
  WebMenuContainer,
} from './app-header.styled'

const kaushanScriptFont = Kaushan_Script({
  subsets: ['latin'],
  weight: ['400'],
})

const commonMenuItems = [
  {
    link: '/browse',
    title: '티켓 찾기',
    target: undefined,
  },
  {
    link: '/about',
    title: '소개',
    target: undefined,
  },
  {
    link: '/blog',
    title: '블로그',
    target: undefined,
  },
] as const

function ModalMenu({
  isOpen,
  onClose,
  isLoggedIn,
  logout,
}: {
  isOpen: boolean
  onClose: () => void
  isLoggedIn: boolean
  logout: () => void
}) {
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
            {commonMenuItems.map((item) => {
              const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
                onClose()
                if (item.link === '/browse') {
                  e.preventDefault()
                  router.push('/browse/seoul')
                }
              }
              return (
                <GlobalLink
                  key={item.link}
                  href={item.link}
                  target={item.target}
                  onClick={onClick}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <Text as="p">{item.title}</Text>
                </GlobalLink>
              )
            })}
            {isLoggedIn ? (
              <HeaderMenuContainerButton role="button" onClick={logout}>
                <HeaderMenuText as="p">로그아웃</HeaderMenuText>
              </HeaderMenuContainerButton>
            ) : (
              <HeaderMenuContainerLink href={'/login'}>
                <HeaderMenuText as="p">로그인</HeaderMenuText>
              </HeaderMenuContainerLink>
            )}
            <GlobalLink href={APP_STORE_URL} onClick={onClose} style={{ margin: '0 auto' }}>
              <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
            </GlobalLink>
          </ModalContent>
        </ModalPaper>
      )}
    </ModalContainer>
  )
}

export function AppHeader({ isLoggedIn: initialIsLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter()
  const [animation, setAnimation] = useState<'show' | 'hide'>('show')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoggedIn, setIsLoggedIn } = useAuthStore()

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: async () => {
      await authUtils.localLogout()
    },
    onSuccess: () => {
      setIsLoggedIn(false)
      router.refresh()
    },
    onError: (error) => {
      console.error(error)
    },
  })

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
    const onResize = () => {
      if (window.innerWidth > breakpoints.large) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (initialIsLoggedIn) {
      setIsLoggedIn(true)
    }
  }, [initialIsLoggedIn, setIsLoggedIn])

  return (
    <>
      <HeaderContainer $animation={animation}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <GlobalLink href="/">
            <HeaderLogo src="/logo.png" alt="header_logo" />
          </GlobalLink>
          <GlobalLink href="/">
            <HeaderTitle as="h1">
              {SERVICE_NAME}{' '}
              <span style={{ fontSize: 12 }} className={kaushanScriptFont.className}>
                BETA
              </span>
            </HeaderTitle>
          </GlobalLink>
        </div>
        <WebMenuContainer>
          {commonMenuItems.map((item) => {
            const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
              if (item.link === '/browse') {
                e.preventDefault()
                router.push('/browse/seoul')
              }
            }
            const Container = item.link === '/browse' ? HeaderMenuContainerLink : HeaderMenuContainerGlobalLink
            return (
              <Container key={item.link} href={item.link} onClick={onClick} target={item.target}>
                <HeaderMenuText as="p">{item.title}</HeaderMenuText>
              </Container>
            )
          })}
          {initialIsLoggedIn || isLoggedIn ? (
            <HeaderMenuContainerButton role="button" onClick={() => logout()}>
              <HeaderMenuText as="p">로그아웃</HeaderMenuText>
            </HeaderMenuContainerButton>
          ) : (
            <HeaderMenuContainerLink href={'/login'}>
              <HeaderMenuText as="p">로그인</HeaderMenuText>
            </HeaderMenuContainerLink>
          )}
          <AppHeaderSearchUI />
          <GlobalLink href={APP_STORE_URL} target="_blank">
            <Button theme="border">{APP_DOWNLOAD_WORDING}</Button>
          </GlobalLink>
          <ColorSchemeToggle />
        </WebMenuContainer>
        <MobileMenuContainer>
          <AppHeaderSearchUI />
          <IconButton onClick={() => setIsModalOpen(true)}>
            <MobileMenuIcon />
          </IconButton>
        </MobileMenuContainer>
      </HeaderContainer>
      <ModalMenu
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoggedIn={initialIsLoggedIn || isLoggedIn}
        logout={logout}
      />
      {isLogoutPending && <Spinner variant="page-overlay" />}
    </>
  )
}

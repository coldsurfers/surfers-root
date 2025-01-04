import { Button, IconButton, media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { AlignRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BILLETS_APP_URL } from '../../features/billets/billets.constants'
import { HEADER_HEIGHT } from './header.constants'

const HeaderContainer = styled.div<{ $animation: 'show' | 'hide' }>`
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT};
  padding: 0 40px;

  background-color: ${semantics.color.background[2]};
  z-index: 99;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  transition: all 0.3s ease-in-out;
  transform: translateY(${({ $animation }) => ($animation === 'show' ? '0' : '-100%')});

  ${media.large(css`
    padding: 0 16px;
  `)}
`

const HeaderTitle = styled(Text)`
  font-size: 32px;
  font-weight: 900;

  @media (max-width: 960px) {
    font-size: 24px;
  }
`

const HeaderLogo = styled.img`
  border-radius: 50%;
  margin-right: 10px;

  width: 62px;
  height: 62px;

  ${media.large(css`
    width: 48px;
    height: 48px;
  `)}
`

const HeaderMenuContainer = styled(Link)`
  background-color: transparent;
  border: none;
  cursor: pointer;

  padding: 10px;
`

const HeaderMenuText = styled(Text)``

const WebMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  @media (max-width: 960px) {
    display: none;
  }
`

const MobileMenuContainer = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: flex;
  }
`

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalPaper = styled.div`
  background: ${semantics.color.background[2]};
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const ModalContent = styled.div`
  margin: 10px 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

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
              <p>About</p>
            </Link>
            <Link href="/blog" onClick={onClose} style={{ alignSelf: 'flex-start' }}>
              <p>Blog</p>
            </Link>
            <Link href={BILLETS_APP_URL} onClick={onClose}>
              <Button theme="indigo">무료 앱 다운로드하기</Button>
            </Link>
          </ModalContent>
          <ModalFooter>
            <Button theme="transparent" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalPaper>
      )}
    </ModalContainer>
  )
}

export function Header() {
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
            <Button theme="indigo">무료 앱 다운로드하기</Button>
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

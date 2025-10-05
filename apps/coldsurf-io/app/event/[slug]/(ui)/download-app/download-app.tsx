'use client'

import { APP_STORE_URL } from '@/libs/constants'
import Link from 'next/link'
import { memo } from 'react'
import {
  AppDownloadButton,
  StyledAppContentContainer,
  StyledAppDownloadText,
  StyledAppText,
  StyledBellIcon,
  StyledDownloadAppContainer,
  StyledDownloadAppLeft,
  StyledDownloadAppLogo,
  StyledMapPinIcon,
} from './download-app.styled'

export const DownloadApp = memo(() => {
  return (
    <>
      <StyledDownloadAppContainer>
        <StyledDownloadAppLeft>
          <StyledAppContentContainer>
            <StyledBellIcon />
            <StyledAppText as="p">{'이벤트가 등록되면 알림을 받을 수 있어요'}</StyledAppText>
          </StyledAppContentContainer>
          <StyledAppContentContainer>
            <StyledMapPinIcon />
            <StyledAppText as="p">{'내 주변의 이벤트를 보여줘요'}</StyledAppText>
          </StyledAppContentContainer>
          <StyledAppContentContainer>
            <StyledMapPinIcon />
            <StyledAppText as="p">{'이벤트를 검색 할 수 있어요'}</StyledAppText>
          </StyledAppContentContainer>
        </StyledDownloadAppLeft>
        <StyledDownloadAppLogo />
      </StyledDownloadAppContainer>
      <Link href={APP_STORE_URL} target="_blank">
        <AppDownloadButton>
          <StyledAppDownloadText>Download in AppStore</StyledAppDownloadText>
        </AppDownloadButton>
      </Link>
    </>
  )
})

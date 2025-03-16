'use client'

import { Button } from '@coldsurfers/ocean-road'
import Link from 'next/link'
import { memo } from 'react'
import { StyledTicketCTAContainer, StyledTicketCTALeft, StyledTicketSellerText } from './ticket-cta.styled'

type TicketCtaItemProps = {
  seller: string
  sellingURL: string
}

export const TicketCtaItem = memo(({ seller, sellingURL }: TicketCtaItemProps) => {
  return (
    <StyledTicketCTAContainer key={seller}>
      <StyledTicketCTALeft>
        <StyledTicketSellerText as="p">{seller}</StyledTicketSellerText>
      </StyledTicketCTALeft>
      <Link href={sellingURL} target="_blank">
        <Button theme="pink" size="md" textWeight="bold" rightIcon={'SquareArrowOutUpRight'}>
          티켓 찾기
        </Button>
      </Link>
    </StyledTicketCTAContainer>
  )
})

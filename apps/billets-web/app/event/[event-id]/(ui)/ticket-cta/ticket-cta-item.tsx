'use client'

import { Button } from '@coldsurfers/ocean-road'
import Link from 'next/link'
import { memo } from 'react'
import {
  StyledTicketCTAContainer,
  StyledTicketCTALeft,
  StyledTicketPriceText,
  StyledTicketSellerText,
} from './ticket-cta.styled'

type TicketCtaItemProps = {
  seller: string
  sellingURL: string
  formattedLowestPrice: string
}

export const TicketCtaItem = memo(({ seller, sellingURL, formattedLowestPrice }: TicketCtaItemProps) => {
  return (
    <StyledTicketCTAContainer key={seller}>
      <StyledTicketCTALeft>
        <StyledTicketSellerText as="p">{seller}</StyledTicketSellerText>
        <StyledTicketPriceText as="p">최저가 {formattedLowestPrice}</StyledTicketPriceText>
      </StyledTicketCTALeft>
      <Link href={sellingURL} target="_blank">
        <Button theme="border">티켓 찾기</Button>
      </Link>
    </StyledTicketCTAContainer>
  )
})

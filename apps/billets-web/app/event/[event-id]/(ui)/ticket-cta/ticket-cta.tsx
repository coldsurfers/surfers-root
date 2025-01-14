'use client'

import { memo } from 'react'
import { TicketCtaItem } from './ticket-cta-item'

export const TicketCta = memo(
  ({
    ticketPromotion,
  }: {
    ticketPromotion: {
      seller: string
      sellingURL: string
      formattedLowestPrice: string
    }
  }) => {
    return (
      <>
        <TicketCtaItem {...ticketPromotion} />
      </>
    )
  },
)

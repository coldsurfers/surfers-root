'use client'

import { memo } from 'react'
import { TicketCtaItem } from './ticket-cta-item'

export const TicketCta = memo(
  ({
    ticketPromotes,
  }: {
    ticketPromotes: {
      seller: string
      sellingURL: string
      formattedLowestPrice: string
    }[]
  }) => {
    return (
      <>
        {ticketPromotes.map((ticketPromote) => (
          <TicketCtaItem key={ticketPromote.seller} {...ticketPromote} />
        ))}
      </>
    )
  },
)

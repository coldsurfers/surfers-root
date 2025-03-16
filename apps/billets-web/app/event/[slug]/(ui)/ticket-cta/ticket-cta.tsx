'use client'

import { memo } from 'react'
import { TicketCtaItem } from './ticket-cta-item'

export const TicketCta = memo(
  ({
    tickets,
  }: {
    tickets: {
      seller: string
      sellingURL: string
    }[]
  }) => {
    return (
      <>
        {tickets.map((ticketPromotion) => (
          <TicketCtaItem key={ticketPromotion.sellingURL} {...ticketPromotion} />
        ))}
      </>
    )
  },
)

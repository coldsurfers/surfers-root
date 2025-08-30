'use client';

import { logEvent } from '@/features/firebase/firebase';
import { Button } from '@coldsurfers/ocean-road';
import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';
import {
  StyledTicketCTAContainer,
  StyledTicketCTALeft,
  StyledTicketSellerText,
} from './ticket-cta.styled';

type TicketCtaItemProps = {
  seller: string;
  sellingURL: string;
};

export const TicketCtaItem = memo(({ seller, sellingURL }: TicketCtaItemProps) => {
  const linkHref = useMemo(() => {
    const url = new URL(sellingURL);
    url.searchParams.set('utm_source', 'coldsurf.io');
    return url.toString();
  }, [sellingURL]);

  const onClick = useCallback(() => {
    logEvent({
      name: 'click_find_ticket',
      params: {
        seller_name: seller,
        url: sellingURL,
      },
    });
  }, [seller, sellingURL]);

  return (
    <StyledTicketCTAContainer key={seller}>
      <StyledTicketCTALeft>
        <StyledTicketSellerText as="p">{seller}</StyledTicketSellerText>
      </StyledTicketCTALeft>
      <Link href={linkHref} target="_blank" onClick={onClick}>
        <Button theme="pink" size="md" textWeight="bold" rightIcon={'SquareArrowOutUpRight'}>
          티켓 찾기
        </Button>
      </Link>
    </StyledTicketCTAContainer>
  );
});

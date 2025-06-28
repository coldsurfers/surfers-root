import { TicketPriceList } from '@/features/ticket-price';
import { Button, Text, colors } from '@coldsurfers/ocean-road';
import { format } from 'date-fns';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import type { Maybe, Ticket } from 'src/__generated__/graphql';
import { DeleteTicketConfirmModal } from '../../../delete-ticket';
import { RegisterTicketPriceInfoModal } from '../register-ticket-price-info-modal';
import {
  StyledTicketBottomWrapper,
  StyledTicketItemContainer,
  StyledTicketItemLabel,
} from './registered-ticket-item.styled';

export const RegisteredTicketItem = ({
  ticket,
  concertId,
}: { ticket: Maybe<Ticket>; concertId: string }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [priceInfoModalVisible, setPriceInfoModalVisible] = useState(false);
  const onClickDelete = useCallback(() => {
    setDeleteModalVisible(true);
  }, []);
  const onClickPriceInfo = useCallback(() => {
    setPriceInfoModalVisible(true);
  }, []);

  if (!ticket) {
    return null;
  }

  return (
    <StyledTicketItemContainer>
      <StyledTicketItemLabel as="h4">티켓 판매자</StyledTicketItemLabel>
      <Text>🎫 {ticket.seller}</Text>
      <StyledTicketItemLabel as="h4">티켓 판매 링크</StyledTicketItemLabel>
      <Link href={ticket.sellingURL} target="_blank" style={{ alignSelf: 'flex-start' }}>
        <Text style={{ color: colors.oc.blue[3].value }}>{ticket.sellingURL}</Text>
      </Link>
      <StyledTicketItemLabel as="h4">티켓 오픈 날짜</StyledTicketItemLabel>
      <Text>{format(new Date(ticket.openDate), 'MMM dd, hh:mm a')}</Text>
      <StyledTicketItemLabel as="h4">티켓 가격 정보</StyledTicketItemLabel>
      {/* Ticket Price list */}
      <TicketPriceList ticketId={ticket.id} />
      <StyledTicketBottomWrapper>
        <Button
          theme={'indigo'}
          onClick={onClickPriceInfo}
          style={{ flex: 0.5, marginRight: '1rem' }}
        >
          가격정보 등록
        </Button>
        <Button theme={'pink'} onClick={onClickDelete} style={{ flex: 0.5 }}>
          삭제하기
        </Button>
      </StyledTicketBottomWrapper>
      <DeleteTicketConfirmModal
        visible={deleteModalVisible}
        concertId={concertId}
        ticketId={ticket.id}
        onClose={() => setDeleteModalVisible(false)}
      />
      <RegisterTicketPriceInfoModal
        visible={priceInfoModalVisible}
        ticketId={ticket.id}
        onClose={() => setPriceInfoModalVisible(false)}
      />
    </StyledTicketItemContainer>
  );
};

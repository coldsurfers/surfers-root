import { Button, colors, Text } from '@coldsurfers/ocean-road'
import { format } from 'date-fns'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { Maybe, Ticket } from 'src/__generated__/graphql'
import { DeleteTicketConfirmModal } from '../../../delete-ticket'
import { StyledTicketItemContainer, StyledTicketItemLabel } from './registered-ticket-item.styled'

export const RegisteredTicketItem = ({ ticket, concertId }: { ticket: Maybe<Ticket>; concertId: string }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const onClickDelete = useCallback(() => {
    setDeleteModalVisible(true)
  }, [])

  if (!ticket) {
    return null
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
      <Button theme={'pink'} onClick={onClickDelete} style={{ marginTop: '1rem' }}>
        삭제하기
      </Button>
      <DeleteTicketConfirmModal
        visible={deleteModalVisible}
        concertId={concertId}
        ticketId={ticket.id}
        onClose={() => setDeleteModalVisible(false)}
      />
    </StyledTicketItemContainer>
  )
}

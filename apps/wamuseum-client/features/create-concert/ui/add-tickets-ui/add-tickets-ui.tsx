'use client';

import { AddButton } from '@/ui';
import { useState } from 'react';
import { AddTicketModal } from '../add-ticket-modal';
import { StyledAddTicketsUIContent } from './add-tickets-ui.styled';

export const AddTicketsUI = ({ concertId }: { concertId: string }) => {
  const [addTicketModalVisible, setAddTicketModalVisible] = useState(false);

  return (
    <>
      <StyledAddTicketsUIContent>
        <AddButton onClick={() => setAddTicketModalVisible(true)} />
      </StyledAddTicketsUIContent>
      <AddTicketModal
        visible={addTicketModalVisible}
        onClose={() => setAddTicketModalVisible(false)}
        concertId={concertId}
      />
    </>
  );
};

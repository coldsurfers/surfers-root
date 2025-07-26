import { Button, Modal, Text } from '@coldsurfers/ocean-road';
import type { ReactNode } from 'react';
import { AddButton } from '../add-button';
import { StyledAddFormModalTop } from './add-form-modal.styled';

export const AddFormModal = ({
  visible,
  onClose,
  onClickTopAddButton,
  formListComponent,
  onClickSubmitForm,
  title,
}: {
  visible: boolean;
  onClose: () => void;
  onClickTopAddButton: () => void;
  title: string;
  formListComponent: ReactNode;
  onClickSubmitForm: () => void;
}) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <StyledAddFormModalTop>
        <Text as="h3">{title}</Text>
        <AddButton onClick={onClickTopAddButton} />
      </StyledAddFormModalTop>
      {formListComponent}
      <Button style={{ width: '100%' }} theme={'indigo'} onClick={onClickSubmitForm}>
        등록하기
      </Button>
    </Modal>
  );
};

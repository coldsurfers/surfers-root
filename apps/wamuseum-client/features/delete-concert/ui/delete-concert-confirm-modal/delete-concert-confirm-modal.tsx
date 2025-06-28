import { Button, Modal, Text } from '@coldsurfers/ocean-road';
import { useCallback } from 'react';
import { useRemoveConcertMutation } from 'src/__generated__/graphql';

export const DeleteConcertConfirmModal = ({
  visible,
  onClose,
  concertId,
  onDeleteSuccess,
}: {
  visible: boolean;
  onDeleteSuccess: () => void;
  onClose: () => void;
  concertId: string;
}) => {
  const [mutateRemoveConcert] = useRemoveConcertMutation({});
  const onClickConfirmDelete = useCallback(() => {
    mutateRemoveConcert({
      variables: {
        input: {
          id: concertId,
        },
      },
      update: (cache, { data }) => {
        if (!data || !data.removeConcert) return;
        const { removeConcert } = data;
        if (removeConcert.__typename !== 'Concert') return;
        const normalizedId = cache.identify({
          id: removeConcert.id,
          __typename: 'Concert',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    }).then(() => {
      onDeleteSuccess();
    });
  }, [concertId, mutateRemoveConcert, onDeleteSuccess]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <Text>확인을 누르면 해당 콘서트를 삭제해요.</Text>
      <Button onClick={onClickConfirmDelete}>확인</Button>
    </Modal>
  );
};

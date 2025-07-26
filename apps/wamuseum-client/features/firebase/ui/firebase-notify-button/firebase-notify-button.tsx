import { Button } from '@coldsurfers/ocean-road';
import { useCallback } from 'react';
import { useNotifyConcertMutation } from 'src/__generated__/graphql';
import { StyledButtonPosition } from './firebase-notify-button.styled';

export const FirebaseNotifyButton = ({ concertId }: { concertId: string }) => {
  const [notifyConcert] = useNotifyConcertMutation();
  const onClick = useCallback(() => {
    notifyConcert({
      variables: {
        input: {
          concertId,
        },
      },
    });
  }, [concertId, notifyConcert]);
  return (
    <StyledButtonPosition>
      <Button theme="indigo" onClick={onClick} style={{ marginTop: 12 }}>
        푸시알림 보내기
      </Button>
    </StyledButtonPosition>
  );
};

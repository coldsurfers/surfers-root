import { Button } from '@coldsurfers/ocean-road';
import { StyledDeleteConcertButtonPosition } from './delete-concert-button.styled';

export const DeleteConcertButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledDeleteConcertButtonPosition>
      <Button theme="pink" onClick={onClick} style={{ marginLeft: 10 }}>
        삭제하기
      </Button>
    </StyledDeleteConcertButtonPosition>
  );
};

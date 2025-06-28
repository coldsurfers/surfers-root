import { Button } from '@coldsurfers/ocean-road';
import { type MouseEventHandler, memo } from 'react';

export const AddButton = memo(({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => (
  <Button theme="white" onClick={onClick} style={{ width: 12, height: 12, marginLeft: 'auto' }}>
    ➕
  </Button>
));

AddButton.displayName = 'AddButon';

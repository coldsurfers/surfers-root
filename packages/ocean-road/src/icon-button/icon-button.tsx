import { forwardRef } from 'react';
import { StyledIconButton } from './icon-button.styled';
import type { IconButtonProps } from './icon-button.types';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <StyledIconButton ref={ref} {...otherProps}>
        {children}
      </StyledIconButton>
    );
  }
);

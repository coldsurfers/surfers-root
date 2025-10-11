import { forwardRef } from 'react';
import { Label } from '../label';
import { StyledTextInputContainer } from './text-input.styled';
import type { TextInputProps } from './text-input.types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, labelStyle, isError, required, ...inputProps }, ref) => {
    return (
      <>
        {label && (
          <Label htmlFor={inputProps.id} style={labelStyle}>
            {label}
          </Label>
        )}
        <StyledTextInputContainer ref={ref} {...inputProps} $isError={!!isError} />
      </>
    );
  }
);

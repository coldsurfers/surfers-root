import { forwardRef } from 'react';
import { Label } from '../label';
import { StyledTextAreaContainer } from './text-area.styled';
import type { TextAreaProps } from './text-area.types';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelStyle, noResize = true, isError, required, ...props }, ref) => {
    return (
      <>
        {label && (
          <Label htmlFor={props.id} style={labelStyle} required={required}>
            {label}
          </Label>
        )}
        <StyledTextAreaContainer
          ref={ref}
          {...props}
          $isError={!!isError}
          style={{
            ...props.style,
            resize: noResize ? 'none' : 'vertical',
          }}
        />
      </>
    );
  }
);

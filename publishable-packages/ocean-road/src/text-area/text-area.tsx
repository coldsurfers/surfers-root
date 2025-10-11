import { forwardRef } from 'react';
import { Label } from '../label';
import { StyledTextAreaContainer } from './text-area.styled';
import type { TextAreaProps } from './text-area.types';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelStyle, noResize = true, required, ...props }, ref) => {
    return (
      <>
        {label && (
          <Label htmlFor={props.id} style={labelStyle}>
            {label}
          </Label>
        )}
        <StyledTextAreaContainer
          ref={ref}
          {...props}
          style={{
            ...props.style,
            resize: noResize ? 'none' : 'vertical',
          }}
        />
      </>
    );
  }
);

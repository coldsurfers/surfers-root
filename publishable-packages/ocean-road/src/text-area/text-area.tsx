import { forwardRef } from 'react';
import { Text } from '../text/text';
import { StyledTextAreaContainer } from './text-area.styled';
import type { TextAreaProps } from './text-area.types';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelStyle, noResize = true, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            htmlFor={props.id}
            style={{ marginTop: '1.5rem', marginBottom: '0.5rem', ...labelStyle }}
          >
            <Text as="p" style={{ margin: 'unset' }}>
              {label}
            </Text>
          </label>
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

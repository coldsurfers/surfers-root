import { forwardRef } from 'react';
import { Text } from '../text/text';
import { StyledTextInputContainer, StylesRequiredLabelMark } from './text-input.styled';
import type { TextInputProps } from './text-input.types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, labelStyle, isError, required, ...inputProps }, ref) => {
    return (
      <>
        {label && (
          <label
            htmlFor={inputProps.id}
            style={{ marginTop: '1.5rem', marginBottom: '0.5rem', ...labelStyle }}
          >
            <Text as="p" style={{ margin: 'unset' }}>
              {label} {required && <StylesRequiredLabelMark as="span">*</StylesRequiredLabelMark>}
            </Text>
          </label>
        )}
        <StyledTextInputContainer ref={ref} {...inputProps} $isError={!!isError} />
      </>
    );
  }
);

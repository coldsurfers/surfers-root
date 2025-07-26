import { TextArea, TextInput } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { memo } from 'react';
import Label from './Label';

const InputWithLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  flex: 1;
`;

const InputWithLabel = memo(
  ({
    value,
    onChangeText,
    label,
    placeholder,
    disabled,
    inputAs = 'input',
  }: {
    value: string;
    // eslint-disable-next-line no-unused-vars
    onChangeText: (text: string) => void;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    inputAs?: 'input' | 'textarea';
  }) => (
    <InputWithLabelWrapper>
      <Label>{label}</Label>
      {inputAs === 'input' ? (
        <TextInput
          disabled={disabled}
          value={value}
          onChange={(event) => onChangeText(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <TextArea
          disabled={disabled}
          value={value}
          onChange={(event) => onChangeText(event.target.value)}
          placeholder={placeholder}
        />
      )}
    </InputWithLabelWrapper>
  )
);

InputWithLabel.displayName = 'InputWithLabel';

export default InputWithLabel;

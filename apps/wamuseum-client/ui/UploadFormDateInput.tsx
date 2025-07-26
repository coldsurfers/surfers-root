import { TextInput } from '@coldsurfers/ocean-road';
import { type ChangeEventHandler, useCallback } from 'react';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const UploadFormDateInput = ({ value, onChangeText, placeholder }: Props) => {
  const handleChangeText = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { value } = event.target;
      const nextText = value;
      if (nextText.length > 10) {
        return;
      }
      onChangeText(value);
    },
    [onChangeText]
  );
  return <TextInput placeholder={placeholder} value={value} onChange={handleChangeText} />;
};

export default UploadFormDateInput;

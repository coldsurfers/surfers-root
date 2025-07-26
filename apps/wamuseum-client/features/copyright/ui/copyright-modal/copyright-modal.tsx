import InputWithLabel from '@/ui/InputWithLabel';
import { Button, Modal } from '@coldsurfers/ocean-road';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import type { CopyrightForm } from './copyright-modal.types';

export const CopyrightModal = ({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: (form: CopyrightForm) => void;
}) => {
  const { setValue, watch } = useForm<CopyrightForm>();
  const { owner, license, licenseURL } = watch();
  const handleClickConfirm = useCallback(
    () =>
      onConfirm({
        owner,
        license,
        licenseURL,
      }),
    [license, licenseURL, onConfirm, owner]
  );
  return (
    <Modal visible={visible} onClose={onClose}>
      <InputWithLabel
        label="저작자 이름"
        value={owner}
        onChangeText={(text) => setValue('owner', text)}
      />
      <InputWithLabel
        label="라이센스"
        value={license}
        onChangeText={(text) => setValue('license', text)}
      />
      <InputWithLabel
        label="라이센스 URL"
        value={licenseURL}
        onChangeText={(text) => setValue('licenseURL', text)}
      />
      <Button onClick={handleClickConfirm}>등록하기</Button>
    </Modal>
  );
};

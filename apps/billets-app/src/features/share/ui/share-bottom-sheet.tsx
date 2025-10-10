import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';

type Props = {
  shareView: ReactNode;
};

export const ShareBottomSheet = ({ shareView }: Props) => {
  return (
    <BottomSheet>
      <BottomSheetView>{shareView}</BottomSheetView>
    </BottomSheet>
  );
};

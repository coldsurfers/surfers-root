'use client';

import type { components } from '@coldsurfers/api-sdk';
import { Modal } from '@coldsurfers/ocean-road';
import {
  StyledFigcaption,
  StyledFigcaptionText,
  StyledFigure,
  StyledImage,
} from './image-modal.styled';

export const ImageModal = ({
  visible,
  onClose,
  src,
  copyright,
}: {
  visible: boolean;
  onClose: () => void;
  src: string;
  copyright?: components['schemas']['CopyrightDTOSchema'];
}) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <StyledFigure>
        <StyledImage src={src} />
        {copyright && (
          <StyledFigcaption>
            <StyledFigcaptionText as="p">
              {`© ${copyright.owner}, ${copyright.license} (${copyright.licenseURL}).`}
            </StyledFigcaptionText>
          </StyledFigcaption>
        )}
      </StyledFigure>
    </Modal>
  );
};

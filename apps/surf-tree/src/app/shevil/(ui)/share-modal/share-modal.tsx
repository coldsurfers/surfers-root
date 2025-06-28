'use client';

import { Modal, Text, semantics } from '@coldsurfers/ocean-road';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { OGInfo } from '../../(utils)';
import { PoweredBy } from '../powered-by';
import { functionLinks } from './(data)';
import { CopyLinkButton } from './(ui)/copy-link-button';
import {
  ShareModalBody,
  ShareModalCloseButton,
  ShareModalContent,
  ShareModalHeader,
  SharedCard,
  SharedCardThumbnail,
  SharedModalFunctionLinks,
  StyledCloseIcon,
} from './share-modal.styled';
import { type ShareModalProps, fetchOGJsonResponseSchema } from './share-modal.types';

const MotionIcon = motion(LoaderCircle);

export function ShareModal({ visible, onClose, sharedLink }: ShareModalProps) {
  const [isLoadingParse, setIsLoadingParse] = useState(false);
  const [ogInfo, setOGInfo] = useState<OGInfo | null>(null);

  useEffect(() => {
    setIsLoadingParse(true);
    async function fetchOG(url: string) {
      const response = await fetch(`/api/og-info?siteUrl=${url}`);
      const json = await response.json();
      const validation = fetchOGJsonResponseSchema.safeParse(json);
      if (validation.success) {
        setOGInfo(validation.data);
      } else {
        console.error(validation.error);
      }
      setIsLoadingParse(false);
    }

    if (sharedLink?.url) {
      fetchOG(sharedLink.url);
    }
  }, [sharedLink?.url]);

  useEffect(() => {
    if (!visible) {
      setIsLoadingParse(false);
      setOGInfo(null);
    }
  }, [visible]);

  console.log(isLoadingParse);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ShareModalContent>
        <ShareModalHeader>
          <Text as="h4" style={{ margin: 'unset' }}>
            Share link
          </Text>
          <ShareModalCloseButton onClick={onClose}>
            <StyledCloseIcon />
          </ShareModalCloseButton>
        </ShareModalHeader>
        <ShareModalBody>
          <SharedCard
            href={sharedLink?.url ?? ''}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.025,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <SharedCardThumbnail $backgroundImage={ogInfo?.image ?? ''}>
              {isLoadingParse && (
                <MotionIcon
                  color={semantics.color.foreground[1]}
                  animate={{
                    rotate: 360, // Rotates the element 360 degrees
                  }}
                  width={32}
                  height={32}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY, // Loops the animation infinitely
                    duration: 0.5, // Each full rotation takes 2 seconds
                    ease: 'linear', // Smooth, constant speed
                  }}
                />
              )}
            </SharedCardThumbnail>
            <Text as="h2" style={{ margin: 'unset', textAlign: 'center' }}>
              {ogInfo?.title}
            </Text>
            <Text
              as="p"
              numberOfLines={1}
              style={{
                margin: 'unset',
                marginTop: '1rem',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: '100%',
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              {sharedLink?.url}
            </Text>
            <Text
              numberOfLines={3}
              as="p"
              style={{
                margin: 'unset',
                marginTop: '1rem',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '14px',
              }}
            >
              {ogInfo?.description}
            </Text>
          </SharedCard>
          <SharedModalFunctionLinks>
            {functionLinks.map((item) => {
              if (item.type === 'COPY_LINK') {
                return <CopyLinkButton key={item.type} copyUrl={sharedLink?.url ?? ''} />;
              }
              return null;
            })}
          </SharedModalFunctionLinks>
          <PoweredBy />
        </ShareModalBody>
      </ShareModalContent>
    </Modal>
  );
}

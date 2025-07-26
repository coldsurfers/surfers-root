'use client';

import { Text, colors } from '@coldsurfers/ocean-road';
import { motion, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { match } from 'ts-pattern';
import { useShallow } from 'zustand/shallow';
import { useCommonStore } from '../../(stores)';
import { ShareButton } from '../share-button';
import { StyledHighlightedLinkLayout, StyledYoutubeEmbedOverlay } from './highlighted-link.styled';
import type { HighlightedLinkProps } from './highlighted-link.types';
import './youtube-embed.css';

export function HighlightedLink(props: HighlightedLinkProps) {
  const controls = useAnimation();
  const [isClicked, setIsClicked] = useState(false);
  const { setSharedLink, toggleShareModalVisible } = useCommonStore(
    useShallow((state) => ({
      setSharedLink: state.setSharedLink,
      toggleShareModalVisible: state.toggleShareModalVisible,
    }))
  );

  const triggerShake = useCallback(() => {
    controls.start({
      rotate: [0, 2, -2, 2, -2, 0],
      x: [0, -2, 2, -2, 2, 0],
      y: [0, 1, -1, 1, -1, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
      },
    });
  }, [controls]);

  useEffect(() => {
    triggerShake();
  }, [triggerShake]);

  useEffect(() => {
    if (isClicked) {
      controls.start({
        rotate: 0, // Reset rotation to initial state
        y: 0, // Reset position to initial state
        x: 0,
        transition: { duration: 0.4, ease: 'easeOut', repeat: 0 }, // Smooth transition back
      });
    }
  }, [controls, isClicked]);

  return (
    <motion.div
      style={{
        display: 'inline-block',
      }}
      animate={controls}
    >
      <StyledHighlightedLinkLayout
        onClick={() => {
          setIsClicked(true);
        }}
      >
        {match(props)
          .with({ type: 'youtube' }, ({ youtubeId, title }) => (
            <>
              <LiteYouTubeEmbed
                id={youtubeId}
                title="YouTube video player"
                wrapperClass="yt-lite custom-yt-lite"
                playerClass="lty-playbtn custom-lty-playbtn"
                muted
              />
              {!isClicked && (
                <StyledYoutubeEmbedOverlay>
                  <Text as="p" style={{ color: colors.oc.white.value }}>
                    {title}
                  </Text>
                </StyledYoutubeEmbedOverlay>
              )}
            </>
          ))
          .exhaustive()}
        <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', zIndex: 2 }}>
          <ShareButton
            onClickShare={() => {
              setSharedLink({
                isHighlighted: true,
                title: props.title,
                url: `https://www.youtube.com/watch?v=${props.youtubeId}`,
              });
              toggleShareModalVisible();
            }}
          />
        </div>
      </StyledHighlightedLinkLayout>
    </motion.div>
  );
}

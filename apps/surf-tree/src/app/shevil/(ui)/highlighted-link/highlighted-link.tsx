'use client'

import { Text } from '@coldsurfers/ocean-road'
import { motion } from 'framer-motion'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { match } from 'ts-pattern'
import { StyledHighlightedLinkLayout, StyledYoutubeEmbedOverlay } from './highlighted-link.styled'
import { HighlightedLinkProps } from './highlighted-link.types'
import './youtube-embed.css'

export function HighlightedLink(props: HighlightedLinkProps) {
  return (
    <motion.div
      style={{
        display: 'inline-block',
      }}
      animate={{
        rotate: [0, 2, -2, 2, -2, 0], // Rotates slightly to create the "top edges shake" effect
        x: [0, -2, 2, -2, 2, 0], // Adds slight horizontal movement
        y: [0, 1, -1, 1, -1, 0], // Adds slight vertical movement
      }}
      transition={{
        duration: 0.5, // Total duration of the shake
        ease: 'easeInOut',
        repeat: Infinity, // Set the number of repetitions (Infinity for continuous)
        repeatDelay: 1, // Delay between repetitions
      }}
    >
      <StyledHighlightedLinkLayout>
        {match(props)
          .with({ type: 'youtube' }, ({ youtubeId, title }) => (
            <>
              <LiteYouTubeEmbed
                id={youtubeId}
                title="YouTube video player"
                wrapperClass="yt-lite custom-yt-lite"
                playerClass="lty-playbtn custom-lty-playbtn"
              />
              <StyledYoutubeEmbedOverlay>
                <Text>{title}</Text>
              </StyledYoutubeEmbedOverlay>
            </>
          ))
          .exhaustive()}
      </StyledHighlightedLinkLayout>
    </motion.div>
  )
}

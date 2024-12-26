'use client'

import { Text } from '@coldsurfers/ocean-road'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { match } from 'ts-pattern'
import { StyledHighlightedLinkLayout, StyledYoutubeEmbedOverlay } from './highlighted-link.styled'
import { HighlightedLinkProps } from './highlighted-link.types'
import './youtube-embed.css'

export function HighlightedLink(props: HighlightedLinkProps) {
  return (
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
  )
}

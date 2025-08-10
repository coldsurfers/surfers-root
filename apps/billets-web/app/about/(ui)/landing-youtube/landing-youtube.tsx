'use client';

import LiteYoutubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { StyledLandingYoutubeContainer } from './landing-youtube.styled';

// const URL = 'https://www.youtube.com/watch?v=h_DjmtR0Xls'
const ID = 'h_DjmtR0Xls';

export function LandingYoutube() {
  return (
    <StyledLandingYoutubeContainer>
      <LiteYoutubeEmbed
        id={ID}
        title="Rick Beato - Why Are Bands Mysteriously Disappearing?"
        wrapperClass="yt-lite custom-yt-lite"
        playerClass="lty-playbtn custom-lty-playbtn"
        muted
      />
    </StyledLandingYoutubeContainer>
  );
}

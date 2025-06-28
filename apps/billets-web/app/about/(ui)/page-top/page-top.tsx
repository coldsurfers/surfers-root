'use client';

import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import Link from 'next/link';
import { memo } from 'react';
import { PageTopFadeInMotion, PageTopSlideUpMotion } from './page-top.motion';
import {
  SectionDivider,
  StyledFigCaption,
  StyledFigure,
  StyledNormalText,
  StyledSectionImage,
  StyledTopTitleText,
} from './page-top.styled';

const sectionContents = [
  [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1723100350314-1629cf301c8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Soufiane Rafik, Unsplash',
    },
    {
      type: 'paragraph',
      text: `I created ${SERVICE_NAME} because I felt sad that lots of bands are disappearing.\nBands always healed my soul in my youth.\n${SERVICE_NAME} support local venues, so bands can be grown up from their locals. (essentially)`,
    },
  ],
  [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1507901747481-84a4f64fda6d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Joseph Pearson, Unsplash',
    },
    {
      type: 'paragraph',
      text: 'I went to England🏴󠁧󠁢󠁥󠁮󠁧󠁿 in 2019.\nIt was heaven to me.\nBecause I can see and feel local gigs very much easier than my country (South Korea).\nI first know about ',
    },
    {
      type: 'link',
      text: 'DICE',
      href: 'https://dice.fm',
    },
    {
      type: 'paragraph',
      text: ' app.\nAnd I was very inspired by DICE including their cool UI and UX.\nThe whole system was very simple and easy to get ticket and hang out in local venues.',
    },
  ],
  [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Aranxa Esteve, Unsplash',
    },
    {
      type: 'paragraph',
      text: `Unfortunately, Korea is not like England.\nWe don't have much local venues, local artist like Europe.\nBut I know there are lots of talented artists in Korea.\nProblem is that they cannot find good local venue to perform.`,
    },
  ],
  [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1622817245531-a07976979cf5?q=80&w=2641&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Bob Coyne, Unsplash',
    },
    {
      type: 'paragraph',
      text: `I created ${SERVICE_NAME} to solve this problem.\nAnd hopefully I want to make good eco system\nfor artists and venues starting from South Korea.`,
    },
  ],
  [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1553877690-c351cc96375a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'charlesdeluvio, Unsplash',
    },
    {
      type: 'paragraph',
      text: `${SERVICE_NAME} is one of the products by `,
    },
    {
      type: 'link',
      text: 'COLDSURF',
      href: 'https://coldsurf.io',
    },
    {
      type: 'paragraph',
      text: '.',
    },
    {
      type: 'paragraph',
      text: '\nWe want to expand support all venues and all kind of events.\nSo let me know your opinion.\nIt would be very helpful to support every artists and venues.',
    },
  ],
] as const;

const renderSectionContents = (contents: typeof sectionContents) => {
  return contents.map((contentChunk) => {
    return (
      <SectionDivider $topSpace key={JSON.stringify(contentChunk)}>
        <PageTopFadeInMotion>
          <StyledNormalText as="span">
            {contentChunk.map((content) => {
              if (content.type === 'image') {
                return (
                  <StyledFigure key={content.src}>
                    <StyledSectionImage
                      key={content.src}
                      src={content.src}
                      alt=""
                      width="100%"
                      height="100%"
                      style={{ objectFit: 'cover' }}
                    />
                    <StyledFigCaption>{content.caption}</StyledFigCaption>
                  </StyledFigure>
                );
              }
              return content.type === 'paragraph' ? (
                content.text
              ) : (
                <Link href={content.href} target="_blank" key={content.href}>
                  {content.text}
                </Link>
              );
            })}
          </StyledNormalText>
        </PageTopFadeInMotion>
      </SectionDivider>
    );
  });
};

export const PageTop = memo(() => {
  return (
    <>
      <SectionDivider $topSpace={false}>
        <PageTopSlideUpMotion>
          <StyledTopTitleText as="h1">Introduce {SERVICE_NAME}</StyledTopTitleText>
        </PageTopSlideUpMotion>
      </SectionDivider>
      {renderSectionContents(sectionContents)}
    </>
  );
});

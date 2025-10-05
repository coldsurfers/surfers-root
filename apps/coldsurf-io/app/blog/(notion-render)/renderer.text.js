'use client';

import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from './post.module.css';

const TextSpan = styled.span`
  line-height: 1.7;

  ${media.medium(css`
    line-height: 1.6;
  `)}
`;

export function Text({ title }) {
  if (!title) {
    return null;
  }
  return title.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
      mention,
      type,
    } = value;
    if (type === 'text') {
      return (
        <TextSpan
          className={[
            bold ? styles.bold : '',
            code ? styles.code : '',
            italic ? styles.italic : '',
            strikethrough ? styles.strikethrough : '',
            underline ? styles.underline : '',
          ].join(' ')}
          style={color !== 'default' ? { color } : {}}
          key={text.content}
        >
          {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
        </TextSpan>
      );
    }

    if (type === 'mention') {
      const { type } = mention;
      if (type === 'link_preview') {
        const { link_preview } = mention;
        const { url } = link_preview;
        return (
          <TextSpan
            className={[
              bold ? styles.bold : '',
              code ? styles.code : '',
              italic ? styles.italic : '',
              strikethrough ? styles.strikethrough : '',
              underline ? styles.underline : '',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}
            key={`${title}`}
          >
            <a href={url} style={{ textDecoration: 'none' }}>
              <TextSpan
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextSpan
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 4,
                  }}
                >
                  {url}
                </TextSpan>
              </TextSpan>
            </a>
          </TextSpan>
        );
      }
      if (type === 'link_mention') {
        const { link_mention } = mention;
        const {
          // description, // "Single · Shevil · 2024 · 3 songs"
          // height, // 352
          href, // "https://open.spotify.com/album/7tHUl5NT6zkfawkmErPDf0"
          icon_url, // "https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
          // iframe_url, // "https://open.spotify.com/embed/album/7tHUl5NT6zkfawkmErPDf0?utm_source=oembed"
          link_provider, // "Spotify"
          // thumbnail_url, // "https://i.scdn.co/image/ab67616d0000b273a4ad9fc81933bbd70a6eb7f3"
          title: linkTitle, // "Cunningham"
        } = link_mention;
        return (
          <TextSpan
            className={[
              bold ? styles.bold : '',
              code ? styles.code : '',
              italic ? styles.italic : '',
              strikethrough ? styles.strikethrough : '',
              underline ? styles.underline : '',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}
            key={`${title}`}
          >
            <a href={href} style={{ textDecoration: 'none' }}>
              <TextSpan
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img src={icon_url} style={{ width: 20, height: 20 }} alt={'notion_icon'} />
                <TextSpan
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 4,
                    color: 'gray',
                  }}
                >
                  {link_provider}
                </TextSpan>
                <TextSpan
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 4,
                  }}
                >
                  {linkTitle}
                </TextSpan>
              </TextSpan>
            </a>
          </TextSpan>
        );
      }
      return null;
    }

    return null;
  });
}

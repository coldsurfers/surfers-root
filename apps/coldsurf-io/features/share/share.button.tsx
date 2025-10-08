'use client';

import { semantics, useColorScheme } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { Check as CheckIcon, Link2 as Link2Icon, Share as ShareIcon } from 'lucide-react';
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { match } from 'ts-pattern';
import { shareFacebook, shareTwitter } from './share.utils';

type ShareButtonType = 'twitter' | 'facebook' | 'copy-link' | 'more';

type ShareTwitterParams = Parameters<typeof shareTwitter>[0];
type ShareFacebookParams = Parameters<typeof shareFacebook>[0];

interface TwitterShareProps extends ShareTwitterParams {
  type: 'twitter';
}

interface FacebookShareProps extends ShareFacebookParams {
  type: 'facebook';
}

interface CopyLinkShareProps {
  type: 'copy-link';
  url: string;
}

interface MoreShareProps extends ShareData {
  type: 'more';
}

type Props = TwitterShareProps | FacebookShareProps | CopyLinkShareProps | MoreShareProps;

const StyledShareButtonWrapper = styled.div<{ $type: ShareButtonType }>`
  width: 2.25rem;
  height: 2.25rem;
  background-color: ${semantics.color.background[3]};
  padding: ${({ $type }) => {
    return match($type)
      .with('twitter', () => '0.5rem')
      .with('facebook', () => '0.25rem')
      .with('copy-link', () => '0.25rem')
      .with('more', () => '0.25rem')
      .exhaustive();
  }};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

const StyledShareButton = styled.img<{ $type: ShareButtonType }>`
  width: ${({ $type }) => {
    return match($type)
      .with('twitter', () => '80%')
      .with('facebook', () => '100%')
      .with('copy-link', () => '100%')
      .with('more', () => '100%')
      .exhaustive();
  }};
  height: ${({ $type }) => {
    return match($type)
      .with('twitter', () => '80%')
      .with('facebook', () => '100%')
      .with('copy-link', () => '100%')
      .with('more', () => '100%')
      .exhaustive();
  }};
  border-radius: ${({ $type }) => {
    return match($type)
      .with('twitter', () => '0%')
      .with('facebook', () => '50%')
      .with('copy-link', () => '100%')
      .with('more', () => '100%')
      .exhaustive();
  }};
`;

const CopyLinkIcon = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  const [checked, setChecked] = useState(false);

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClick();
      setChecked(true);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        setChecked(false);
      }, 2500);
    },
    [onClick]
  );

  return (
    <StyledShareButtonWrapper $type="copy-link" onClick={handleClick}>
      {checked ? <CheckIcon /> : <Link2Icon />}
    </StyledShareButtonWrapper>
  );
};

export const ShareButton = forwardRef<HTMLImageElement, Props>((props, ref) => {
  const { theme } = useColorScheme();
  const isLightMode = theme.name === 'lightMode';

  const onClick = useCallback(() => {
    match(props)
      .with({ type: 'twitter' }, (props) => {
        shareTwitter(props);
      })
      .with({ type: 'facebook' }, (props) => {
        shareFacebook(props);
      })
      .with({ type: 'copy-link' }, (props) => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(props.url);
        }
      })
      .with({ type: 'more' }, async (props) => {
        if (navigator.share) {
          await navigator.share(props);
        }
      })
      .exhaustive();
  }, [props]);

  const imageSource = useMemo<{ twitter: string; facebook: string }>(() => {
    const twitterImageSource = isLightMode
      ? '/icons/sns/x/logo-black.png'
      : '/icons/sns/x/logo-white.png';
    const facebookImageSource = isLightMode
      ? '/icons/sns/facebook/Facebook_Logo_Primary.png'
      : '/icons/sns/facebook/Facebook_Logo_Secondary.png';
    return {
      twitter: twitterImageSource,
      facebook: facebookImageSource,
    };
  }, [isLightMode]);

  return match(props)
    .with({ type: 'twitter' }, { type: 'facebook' }, (props) => {
      return (
        <StyledShareButtonWrapper $type={props.type} onClick={onClick}>
          <StyledShareButton ref={ref} src={imageSource[props.type]} $type={props.type} />
        </StyledShareButtonWrapper>
      );
    })
    .with({ type: 'copy-link' }, () => {
      return <CopyLinkIcon onClick={onClick} />;
    })
    .with({ type: 'more' }, () => {
      return (
        <StyledShareButtonWrapper $type="more" onClick={onClick}>
          <ShareIcon />
        </StyledShareButtonWrapper>
      );
    })
    .exhaustive();
});

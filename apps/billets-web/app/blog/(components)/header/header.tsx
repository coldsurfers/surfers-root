'use client';

import { useParams, usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import {
  StyledHeaderBigContainer,
  StyledHeaderContainer,
  StyledHeaderHeading,
  StyledHeaderLinkBadge,
} from './header.styled';

const HeaderBadge = memo(
  ({ href, isActive, title }: { href: string; isActive: boolean; title: string }) => {
    return (
      <StyledHeaderLinkBadge href={href} $isactive={isActive ? 'true' : undefined}>
        <StyledHeaderHeading $isactive={isActive ? 'true' : undefined} as="p">
          {title}
        </StyledHeaderHeading>
      </StyledHeaderLinkBadge>
    );
  }
);

export const Header = () => {
  const pathname = usePathname();
  const params = useParams();
  const seriesParam = useMemo(() => {
    return params.series as string;
  }, [params.series]);

  const data = useMemo<
    {
      href: string;
      title: string;
      isActive: boolean;
    }[]
  >(() => {
    return [
      {
        href: '/blog/tech',
        title: 'TECH',
        isActive: seriesParam === 'tech',
      },
      {
        href: '/blog/sound',
        title: 'SOUND',
        isActive: seriesParam === 'sound',
      },
      {
        href: '/blog/video',
        title: 'VIDEO',
        isActive: seriesParam === 'video',
      },
      {
        href: '/blog/text',
        title: 'TEXT',
        isActive: seriesParam === 'text',
      },
      {
        href: '/blog/about',
        title: 'ABOUT',
        isActive: pathname.startsWith('/about'),
      },
    ];
  }, [pathname, seriesParam]);

  return (
    <StyledHeaderBigContainer>
      <StyledHeaderContainer>
        {data.map((item) => (
          <HeaderBadge key={item.title} {...item} />
        ))}
      </StyledHeaderContainer>
    </StyledHeaderBigContainer>
  );
};

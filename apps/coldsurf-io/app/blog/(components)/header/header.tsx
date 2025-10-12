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

type Props = {
  isOfficialBlog?: boolean;
};

export const Header = ({ isOfficialBlog }: Props) => {
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
    if (isOfficialBlog) {
      return [
        { href: '/official-blog/news', title: 'NEWS', isActive: seriesParam === 'news' },
        { href: '/official-blog/culture', title: 'CULTURE', isActive: seriesParam === 'culture' },
      ];
    }
    return [
      {
        href: '/blog/catholic',
        title: 'CATHOLIC',
        isActive: seriesParam === 'catholic',
      },
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
  }, [pathname, seriesParam, isOfficialBlog]);

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

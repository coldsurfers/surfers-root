'use client';

import { apiClient } from '@/libs/openapi-client';
import { useCommonUIStore } from '@/libs/stores';
import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { SearchItem } from '../search-item';
import { SearchResultWrapper } from './floating-search-result.styled';

const StyledEmptyText = styled(Text)`
  color: ${semantics.color.foreground[1]};
`;

interface FloatingSearchResultProps {
  keyword: string;
}

export const FloatingSearchResult = ({ keyword }: FloatingSearchResultProps) => {
  const { closeFloatingSearchBar } = useCommonUIStore();
  const { data } = useQuery({
    queryKey: apiClient.search.queryKeys.list(keyword),
    queryFn: () => apiClient.search.getSearchResult(keyword),
    enabled: !!keyword,
  });

  if (!data) {
    return null;
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <SearchResultWrapper>
        <StyledEmptyText>🥺 앗, 해당하는 정보가 없어요!</StyledEmptyText>
      </SearchResultWrapper>
    );
  }

  return (
    <SearchResultWrapper>
      {data.map((item) => (
        <SearchItem key={item.id} {...item} onClick={closeFloatingSearchBar} />
      ))}
    </SearchResultWrapper>
  );
};

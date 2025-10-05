'use client';

import { useCommonUIStore } from '@/libs/stores';
import { SearchIconUI, SearchIconWrapper } from './app-header.styled';

export const AppHeaderSearchUI = () => {
  const { openFloatingSearchBar } = useCommonUIStore();
  return (
    <SearchIconWrapper onClick={openFloatingSearchBar}>
      <SearchIconUI />
    </SearchIconWrapper>
  );
};

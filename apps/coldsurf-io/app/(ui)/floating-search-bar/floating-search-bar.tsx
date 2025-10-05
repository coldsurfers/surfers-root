'use client';

import { GLOBAL_Z_INDEX } from '@/libs/constants';
import { useCommonUIStore } from '@/libs/stores';
import { Modal } from '@coldsurfers/ocean-road';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { FloatingSearchResult } from '../floating-search-result';
import { FloatingSearchBarWrapper, FloatingSearchTextInput } from './floating-search-bar.styled';

export const FloatingSearchBar = () => {
  const { floatingSearchBarVisible, closeFloatingSearchBar } = useCommonUIStore();
  const [keyword, setKeyword] = useState<string>('');
  const debouncedSearchKeyword = useDebounce(keyword, 350);

  useEffect(() => {
    if (!floatingSearchBarVisible) {
      setKeyword('');
    }
  }, [floatingSearchBarVisible]);

  return (
    <Modal
      visible={floatingSearchBarVisible}
      onClose={closeFloatingSearchBar}
      zIndex={GLOBAL_Z_INDEX.APP_HEADER + 1}
    >
      <FloatingSearchBarWrapper>
        <FloatingSearchTextInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
          placeholder="🔎 어떤 공연을 찾고 싶으세요?"
        />
        <FloatingSearchResult keyword={debouncedSearchKeyword} />
      </FloatingSearchBarWrapper>
    </Modal>
  );
};

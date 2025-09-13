'use client';

import { Text } from '@coldsurfers/ocean-road';

export const TopText = () => {
  return (
    <Text as="h1" style={{ display: 'flex', alignItems: 'center', fontWeight: 400 }}>
      안녕하세요,{' '}
      <span>
        <Text as="h2" style={{ fontWeight: 'bold' }}>
          COLDSURF
        </Text>
      </span>{' '}
      입니다.
    </Text>
  );
};

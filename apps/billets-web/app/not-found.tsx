'use client';

import { Button, Text } from '@coldsurfers/ocean-road';
import Link from 'next/link';
import { AboutPageLayout } from './(ui)/about-page-layout';

export default function NotFound() {
  return (
    <AboutPageLayout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Text as="h1">앗, 찾을 수 없어요!</Text>
        <Text as="h3" style={{ fontWeight: 'lighter' }}>
          찾으시는 페이지가 없어요. 다시 한 번 확인해주세요.
        </Text>
        <Link href="/">
          <Button theme="border">홈으로 돌아가기</Button>
        </Link>
      </div>
    </AboutPageLayout>
  );
}

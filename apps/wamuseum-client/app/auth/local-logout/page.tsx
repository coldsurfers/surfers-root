'use client';

import { authUtils } from '@/utils/utils.auth';
import { Spinner } from '@coldsurfers/ocean-road';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function LocalLogoutPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    authUtils.localLogout().then(() => {
      router.replace('/auth/signin');
    });
  }, [router]);

  return (
    <>
      <Spinner variant="page-overlay" />
    </>
  );
}

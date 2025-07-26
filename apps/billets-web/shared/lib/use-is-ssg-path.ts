'use client';

import { usePathname } from 'next/navigation';

const ssgPaths = ['/blog'];

export const useIsSsgPath = () => {
  const pathname = usePathname();
  return ssgPaths.includes(pathname);
};

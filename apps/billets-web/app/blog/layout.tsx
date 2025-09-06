import type { ReactNode } from 'react';

export const revalidate = 3600;

export default async function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}

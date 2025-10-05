import type { ReactNode } from 'react';

export const revalidate = 3600;

export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  return [];
};

export default async function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}

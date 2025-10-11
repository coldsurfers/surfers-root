import type { ReactNode } from 'react';

export const revalidate = 3600;
export const dynamic = 'force-static';

export default function OfficialBlogSeriesSlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

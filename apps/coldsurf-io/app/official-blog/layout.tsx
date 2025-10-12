import { SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

export const revalidate = 3600;

export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  return [];
};

export function generateMetadata(): Metadata {
  const title = `OFFICIAL BLOG, ${SERVICE_NAME}`;
  const description = `${SERVICE_NAME}의 최신 소식`;
  return metadataInstance.generateMetadata<Metadata>({
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${SITE_URL}/official-blog`,
    },
  });
}

export default function OfficialBlogLayout({ children }: { children: ReactNode }) {
  return children;
}

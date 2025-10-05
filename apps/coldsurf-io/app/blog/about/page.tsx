import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { SITE_URL } from '@/libs/constants';
import { getQueryClient } from '@/libs/utils/utils.query-client';
import type { Metadata } from 'next/types';
import { NotionAPI } from 'notion-client';
import { PageLayout } from '../(components)/page-layout';
import { metadataInstance } from '../(metadata)/metadata-instance';
import { NotionRenderer } from '../(notion-render)/notion-renderer';
import { queryKeyFactory } from '../(react-query)/react-query.key-factory';
import { StyledAboutPageInnerLayout, StyledWritersPageHeader } from './page.styled';

const notion = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
});

export const dynamic = 'force-static';

export async function generateMetadata() {
  const metaTitle = 'COLDSURF Blog: Writers & Members';
  const metaDescription = 'Introduce our writers and members';

  const meta = metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      url: `${SITE_URL}/blog/writers`,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/writers`,
      languages: {
        ko: `${SITE_URL}/blog/writers`,
      },
    },
  });

  return meta;
}

const notionPageId = {
  en: 'about-2025-En-18d2bbac578280bc9271f7d4ab58b33a',
  ko: 'about-2025-18d2bbac5782804d8c88dc076b26c359',
};

export default async function WritersPage() {
  const recordMap = await notion.getPage(notionPageId.ko);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKeyFactory.users.list);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout title="ABOUT">
        <StyledAboutPageInnerLayout>
          <StyledWritersPageHeader>
            <NotionRenderer recordMap={recordMap} />
          </StyledWritersPageHeader>
        </StyledAboutPageInnerLayout>
      </PageLayout>
    </HydrationBoundary>
  );
}

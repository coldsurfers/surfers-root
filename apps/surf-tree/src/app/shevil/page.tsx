import type { Metadata } from 'next/types';
import { LinkItems, ShareModal } from './(components)';
import { shevilData } from './(data)';
import { HeroInfo, PageLayout, TopCard } from './(ui)';

export const metadata: Metadata = {
  title: 'Shevil | SurfTree',
  description: shevilData.subtitle,
  icons: {
    icon: '/icons/favicon.ico',
  },
};

export default function ShevilPage() {
  return (
    <>
      <PageLayout>
        <TopCard backgroundImageUrl={shevilData.profileImageUrl} />
        <HeroInfo title={shevilData.title} subtitle={shevilData.subtitle} />
        <LinkItems />
      </PageLayout>
      <ShareModal />
    </>
  );
}

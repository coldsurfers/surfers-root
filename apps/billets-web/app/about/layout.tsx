import { COMMON_META_DESCRIPTION } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { AboutPageLayout } from 'app/(ui)/about-page-layout';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return metadataInstance.generateMetadata<Metadata>({
    title: `Story and Mission | About ${SERVICE_NAME}`,
    description: COMMON_META_DESCRIPTION,
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <AboutPageLayout>{children}</AboutPageLayout>;
}

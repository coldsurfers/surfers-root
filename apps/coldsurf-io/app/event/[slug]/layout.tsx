import { metadataInstance } from '@/libs/metadata';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { generateEventDetailMetadata } from './(utils)';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const eventDetailMetadata = await generateEventDetailMetadata(pageParams.slug);
  return metadataInstance.generateMetadata<Metadata>(eventDetailMetadata);
}

export default function EventDetailPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

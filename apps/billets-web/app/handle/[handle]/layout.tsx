import { featureFlags } from '@/shared/constants';
import { notFound } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export default function HandleDetailPageLayout({ children }: PropsWithChildren) {
  if (!featureFlags.useProfileFeature) {
    return notFound();
  }
  return children;
}

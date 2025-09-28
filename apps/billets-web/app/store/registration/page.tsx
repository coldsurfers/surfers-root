import { FEATURE_FLAGS } from '@/libs/constants';
import { notFound } from 'next/navigation';
import { PageContent } from './(ui)';

const visible = FEATURE_FLAGS.useStoreRegistrationFeature;

export default function StorePage() {
  if (!visible) {
    notFound();
  }
  return <PageContent />;
}

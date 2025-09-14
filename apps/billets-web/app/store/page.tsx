import { AboutPageLayout } from 'app/(ui)/about-page-layout';
import { notFound } from 'next/navigation';
import { PageContent } from './(ui)';

const visible = false;

export const dynamic = 'force-static';

export default function StorePage() {
  if (!visible) {
    notFound();
  }
  return (
    <AboutPageLayout>
      <PageContent />
    </AboutPageLayout>
  );
}

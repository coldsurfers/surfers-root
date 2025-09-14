import { AboutPageLayout } from 'app/(ui)/about-page-layout';
import { notFound } from 'next/navigation';
import { TopText } from './(ui)';

const visible = true;

export const dynamic = 'force-static';

export default function StorePage() {
  if (!visible) {
    notFound();
  }
  return (
    <AboutPageLayout>
      <TopText />
    </AboutPageLayout>
  );
}

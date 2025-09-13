import { AboutPageLayout } from 'app/(ui)/about-page-layout';
import { notFound } from 'next/navigation';
import { TopText } from './(ui)';

const visible = false;

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

import { notFound } from 'next/navigation';
import { NotionAPI } from 'notion-client';
import { PageRenderer } from './(ui)';

const notion = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
});

export const revalidate = 3600;

export const dynamic = 'force-static';

export async function generateMetadata() {
  const pageTitle = 'About Paul';
  return {
    title: pageTitle,
  };
}

const notionPageId = {
  en: 'Resume-2025-1862bbac578280e39760f02a88e17941',
  ko: 'Resume-2025-1862bbac5782802db432c9b8ee5016b4',
};

const AboutDetailPage = async (props: { params: Promise<{ user: string }> }) => {
  const params = await props.params;
  const { user } = params;
  if (user !== 'paul') {
    notFound();
  }
  const careerPageId = notionPageId.ko;
  const careerRecordMap = await notion.getPage(careerPageId);

  return (
    <PageRenderer
      title={`About ${user.toUpperCase()}`}
      locale={'ko'}
      careerRecordMap={careerRecordMap}
    />
  );
};

export default AboutDetailPage;

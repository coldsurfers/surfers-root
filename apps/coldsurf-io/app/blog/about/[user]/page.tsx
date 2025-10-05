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

export async function generateStaticParams() {
  return [{ user: 'paul' }];
}

const notionPageId = {
  en: 'Fake-Resume-en-2742bbac5782801394acf6ebd2918c0e',
  ko: 'Fake-Resume-2742bbac578280a099a7c5ec51719079',
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

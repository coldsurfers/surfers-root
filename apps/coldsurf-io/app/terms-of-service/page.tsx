import { NotionRenderer } from '@/features/notion';
import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

export default async function TermsOfService() {
  const recordMap = await notion.getPage('Billets-14b2bbac578280648515e582a8d371a0');
  return <NotionRenderer recordMap={recordMap} />;
}

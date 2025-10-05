import { NotionRenderer } from '@/features/notion';
import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

export default async function PrivacyPolicy() {
  const recordMap = await notion.getPage('Billets-14a2bbac578280d8bdbbcaff952d1ab5');
  return <NotionRenderer recordMap={recordMap} />;
}

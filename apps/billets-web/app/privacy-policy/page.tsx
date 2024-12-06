import { NotionAPI } from 'notion-client'
import { PrivacyPolicyPageClient } from './page.client'

const notion = new NotionAPI()

export default async function PrivacyPolicy() {
  const recordMap = await notion.getPage('Billets-14a2bbac578280d8bdbbcaff952d1ab5')
  return <PrivacyPolicyPageClient recordMap={recordMap} />
}

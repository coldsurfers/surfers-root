import { queryNotionBlogTechArticles } from 'lib/utils'
import { TechlogPageClient } from './page.client'

async function initPage() {
  return await await queryNotionBlogTechArticles()
}

export default async function TechlogPage() {
  const logs = await initPage()

  return <TechlogPageClient logs={logs} />
}

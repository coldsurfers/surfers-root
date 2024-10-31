import { queryNotionBlogThoughtsArticles } from 'lib/utils'
import { SurflogPageClient } from './page.client'

async function initPage() {
  return await await queryNotionBlogThoughtsArticles()
}

export default async function TechlogPage() {
  const logs = await initPage()

  return <SurflogPageClient logs={logs} />
}

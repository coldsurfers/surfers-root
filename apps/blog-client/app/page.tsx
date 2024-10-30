import { queryNotionBlogTechArticles, queryNotionBlogThoughtsArticles } from '../lib/utils'
import PageClient from './page.client'

const Page = async () => {
  const techPosts = await queryNotionBlogTechArticles()
  const thoughtsPosts = await queryNotionBlogThoughtsArticles()
  return <PageClient techPosts={techPosts} thoughtsPosts={thoughtsPosts} />
}

export default Page

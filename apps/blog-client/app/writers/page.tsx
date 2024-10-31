import notionInstance from 'lib/notionInstance'
import { WritersPageClient } from './page.client'

async function retrieveUsers() {
  const users = await notionInstance.users.list({})
  const { results } = users
  return results.filter((value) => value.type === 'person')
}

export default async function WritersPage() {
  const users = await retrieveUsers()
  return <WritersPageClient users={users} />
}

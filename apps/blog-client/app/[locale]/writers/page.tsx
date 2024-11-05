import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import notionInstance from 'lib/notionInstance'
import { setRequestLocale } from 'next-intl/server'
import { WritersPageClient } from './page.client'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function retrieveUsers() {
  const users = await notionInstance.users.list({})
  const { results } = users
  return results.filter((value) => value.type === 'person')
}

export default async function WritersPage({ params }: PageProps) {
  setRequestLocale(params.locale)
  const users = await retrieveUsers()
  return <WritersPageClient users={users} />
}

import { redirect, routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { NotionAPI } from 'notion-client'
import { PageRenderer } from './(ui)'

const notion = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
})

export const revalidate = 3600

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const pageTitle = `About Paul`
  return {
    title: pageTitle,
  }
}

const AboutDetailPage = async ({ params }: PageProps<{ user: string }>) => {
  const { locale, user } = params
  if (user !== 'paul') {
    return redirect({ href: '/404', locale: locale })
  }
  const careerPageId =
    locale === 'en' ? 'Resume-1352bbac5782803a8a6de858f18f3b8c' : 'Resume-2025-1862bbac5782802db432c9b8ee5016b4'
  const careerRecordMap = await notion.getPage(careerPageId)
  setRequestLocale(locale)

  return <PageRenderer title={`About ${user.toUpperCase()}`} locale={params.locale} careerRecordMap={careerRecordMap} />
}

export default AboutDetailPage

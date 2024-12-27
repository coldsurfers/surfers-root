import { routing } from 'i18n/routing'
import { PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { NotionAPI } from 'notion-client'
import PageClient from './page.client'

const notion = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
})

export const revalidate = 3600

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const pageTitle = `Résumé`
  const pageDesc = 'Résumé'
  return {
    title: pageTitle,
    description: pageDesc,
  }
}

const ResumePage = async ({ params }: PageProps) => {
  const { locale } = params
  const careerPageId =
    locale === 'en' ? 'Resume-1352bbac5782803a8a6de858f18f3b8c' : 'Resume-404c7eb0aa6743bbb5b4bec201c2ad4e'
  const sideProjectPageId =
    locale === 'en'
      ? 'Side-Project-Resume-1352bbac57828008b8b1c41831a9f46b'
      : 'Side-Project-Resume-6396c6e1255f4380ac158f72696263ac'
  const careerRecordMap = await notion.getPage(careerPageId)
  const sideProjectRecordMap = await notion.getPage(sideProjectPageId)
  setRequestLocale(locale)

  return (
    <PageClient locale={params.locale} careerRecordMap={careerRecordMap} sideProjectRecordMap={sideProjectRecordMap} />
  )
}

export default ResumePage

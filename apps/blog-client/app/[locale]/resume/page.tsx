import { routing } from 'i18n/routing'
import { AppLocale, PageProps } from 'i18n/types'
import { setRequestLocale } from 'next-intl/server'
import { getBlocks } from '../../../lib/notion'
import { queryNotionResumePage } from './fetchers'
import PageClient from './page.client'

export const revalidate = 3600

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function getPageData(locale: AppLocale) {
  const promises = [
    queryNotionResumePage('Career', locale),
    queryNotionResumePage('Music Career', locale),
    queryNotionResumePage('Side Project Career', locale),
  ]
  const [careerResult, musicCareerResult, sideProjectCareerResult] = await Promise.all(promises)
  return [careerResult, musicCareerResult, sideProjectCareerResult]
}

export async function generateMetadata() {
  // @ts-ignore
  const pageTitle = `Resume | Blog, ColdSurf`
  const pageDesc = 'resume'
  return {
    title: pageTitle,
    description: pageDesc,
  }
}

const ResumePage = async ({ params }: PageProps) => {
  setRequestLocale(params.locale)
  const [careerResult, musicCareerResult, sideProjectCareerResult] = await getPageData(params.locale)
  const careerPage = careerResult.results.at(0)
  const musicCareerPage = musicCareerResult.results.at(0)
  const sideProjectCareerPage = sideProjectCareerResult.results.at(0)

  if (!careerPage || !musicCareerPage || !sideProjectCareerPage) {
    return null
  }

  const careerBlocks = await getBlocks(careerPage.id)
  const sideProjectCareerBlocks = await getBlocks(sideProjectCareerPage.id)

  return <PageClient careerBlocks={careerBlocks} sideProjectCareerBlocks={sideProjectCareerBlocks} />
}

export default ResumePage

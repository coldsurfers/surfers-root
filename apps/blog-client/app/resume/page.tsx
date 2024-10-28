import { getBlocks } from '../../lib/notion'
import { queryNotionResumePage } from './fetchers'
import PageClient from './page.client'

async function getPageData() {
  const promises = [
    queryNotionResumePage('Career'),
    queryNotionResumePage('Music Career'),
    queryNotionResumePage('Side Project Career'),
  ]
  const [careerResult, musicCareerResult, sideProjectCareerResult] =
    await Promise.all(promises)
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

const ResumePage = async () => {
  const [careerResult, musicCareerResult, sideProjectCareerResult] =
    await getPageData()
  const careerPage = careerResult.results.at(0)
  const musicCareerPage = musicCareerResult.results.at(0)
  const sideProjectCareerPage = sideProjectCareerResult.results.at(0)

  if (!careerPage || !musicCareerPage || !sideProjectCareerPage) {
    return null
  }

  const careerBlocks = await getBlocks(careerPage.id)
  const sideProjectCareerBlocks = await getBlocks(sideProjectCareerPage.id)

  return (
    <PageClient
      careerBlocks={careerBlocks}
      sideProjectCareerBlocks={sideProjectCareerBlocks}
    />
  )
}

export default ResumePage

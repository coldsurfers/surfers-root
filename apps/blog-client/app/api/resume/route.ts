import { queryNotionResumePage } from '@/features/notion'
import { getBlocks } from '@/lib/notion'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale')
  if (locale !== 'en' && locale !== 'ko') {
    return NextResponse.json({ error: 'locale query is strange' }, { status: 409 })
  }
  const promises = [
    queryNotionResumePage('Career', locale),
    queryNotionResumePage('Music Career', locale),
    queryNotionResumePage('Side Project Career', locale),
  ]
  const [careerResult, musicCareerResult, sideProjectCareerResult] = await Promise.all(promises)

  const careerPage = careerResult.results.at(0)
  const musicCareerPage = musicCareerResult.results.at(0)
  const sideProjectCareerPage = sideProjectCareerResult.results.at(0)

  const careerBlocks = await getBlocks(careerPage?.id)
  const sideProjectCareerBlocks = await getBlocks(sideProjectCareerPage?.id)

  return NextResponse.json({
    blocks: {
      career: careerBlocks,
      side: sideProjectCareerBlocks,
    },
  })
}

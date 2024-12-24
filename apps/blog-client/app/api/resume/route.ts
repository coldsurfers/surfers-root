import { getBlocks } from '@/features'
import { queryResumePage } from '@/features/resume/resume.query'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale')
  if (locale !== 'en' && locale !== 'ko') {
    return NextResponse.json({ error: 'locale query is strange' }, { status: 409 })
  }
  const promises = [
    queryResumePage('Career', locale),
    queryResumePage('Music Career', locale),
    queryResumePage('Side Project Career', locale),
  ]
  const [careerResult, musicCareerResult, sideProjectCareerResult] = await Promise.all(promises)

  const careerPage = careerResult.results.at(0)
  const sideProjectCareerPage = sideProjectCareerResult.results.at(0)

  const careerBlocks = careerPage?.id
    ? await getBlocks({
        blockId: careerPage.id,
        withUploadCloudinary: false,
      })
    : []
  const sideProjectCareerBlocks = sideProjectCareerPage?.id
    ? await getBlocks({
        blockId: sideProjectCareerPage?.id,
        withUploadCloudinary: false,
      })
    : []

  return NextResponse.json({
    blocks: {
      career: careerBlocks,
      side: sideProjectCareerBlocks,
    },
  })
}

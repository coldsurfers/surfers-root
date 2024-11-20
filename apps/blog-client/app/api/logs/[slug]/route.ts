import {
  getBlocks,
  logPlatformSchema,
  queryFilmlogDetail,
  querySoundlogDetail,
  querySquarelogDetail,
  querySurflogDetail,
  queryTechlogDetail,
  queryTextlogDetail,
} from '@/features'
import { NextRequest, NextResponse } from 'next/server'
import { match } from 'ts-pattern'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const searchParams = request.nextUrl.searchParams
  const platform = searchParams.get('platform')
  const platformValidation = logPlatformSchema.safeParse(platform)
  if (!platformValidation.success) {
    return NextResponse.json({ error: 'platform query is strange' }, { status: 409 })
  }
  const locale = searchParams.get('locale')
  if (locale !== 'en' && locale !== 'ko') {
    return NextResponse.json({ error: 'locale query is strange' }, { status: 409 })
  }
  const slug = (await params).slug
  const page = await match(platformValidation.data)
    .with('surflog', async () => await querySurflogDetail({ slug, lang: locale }))
    .with('techlog', async () => await queryTechlogDetail({ slug, lang: locale }))
    .with('filmlog', async () => await queryFilmlogDetail({ slug, lang: locale }))
    .with('soundlog', async () => await querySoundlogDetail({ slug, lang: locale }))
    .with('squarelog', async () => await querySquarelogDetail({ slug, lang: locale }))
    .with('textlog', async () => await queryTextlogDetail({ slug, lang: locale }))
    .exhaustive()
  if (!page) {
    return NextResponse.json({ message: 'page not found' }, { status: 404 })
  }
  const blocks = await getBlocks({
    blockId: page.id,
    withUploadCloudinary: true,
  })
  if (!blocks) {
    return NextResponse.json({ message: 'blocks not found' }, { status: 404 })
  }

  return NextResponse.json({ page, blocks }, { status: 200 })
}

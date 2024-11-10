import { getSurflogDetail, getTechlogDetail } from '@/lib'
import { getBlocks } from '@/lib/notion'
import { NextRequest, NextResponse } from 'next/server'
import { match } from 'ts-pattern'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const searchParams = request.nextUrl.searchParams
  const platform = searchParams.get('platform')
  if (platform !== 'techlog' && platform !== 'surflog') {
    return NextResponse.json({ error: 'platform query is strange' }, { status: 409 })
  }
  const locale = searchParams.get('locale')
  if (locale !== 'en' && locale !== 'ko') {
    return NextResponse.json({ error: 'locale query is strange' }, { status: 409 })
  }
  const slug = (await params).slug
  const page = await match(platform)
    .with('surflog', async () => await getSurflogDetail({ slug, lang: locale }))
    .with('techlog', async () => await getTechlogDetail({ slug, lang: locale }))
    .exhaustive()
  if (!page) {
    return NextResponse.json({ error: 'page not found' }, { status: 404 })
  }
  const blocks = await getBlocks(page?.id)
  if (!blocks) {
    return NextResponse.json({ error: 'blocks not found' }, { status: 404 })
  }
  return NextResponse.json({ page, blocks }, { status: 200 })
}

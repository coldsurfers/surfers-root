import { logPlatformSchema, queryLogs } from '@/features'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
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
  const tag = searchParams.get('tag')
  const logs = await queryLogs(platformValidation.data, locale, { tag: tag ?? undefined })
  return NextResponse.json({ logs: logs }, { status: 200 })
}

import { querySeries } from '@/features'
import { NextRequest, NextResponse } from 'next/server'
import { FetchGetSeriesSearchParamsSchema } from './types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tagParam = searchParams.get('tag')
  const searchParamsValidation = FetchGetSeriesSearchParamsSchema.safeParse({
    series: searchParams.get('series'),
    appLocale: searchParams.get('appLocale'),
    tag: tagParam ? decodeURIComponent(tagParam) : undefined,
  })
  if (!searchParamsValidation.success) {
    return NextResponse.json({ error: 'search params is not valid' }, { status: 409 })
  }
  const response = await querySeries({
    series: searchParamsValidation.data.series,
    lang: searchParamsValidation.data.appLocale,
    tag: searchParamsValidation.data.tag,
  })
  return NextResponse.json(response, { status: 200 })
}

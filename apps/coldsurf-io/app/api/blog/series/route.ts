import { querySeries } from 'app/blog/(notion)/query';
import { type NextRequest, NextResponse } from 'next/server';
import { FetchGetSeriesSearchParamsSchema } from './types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tagParam = searchParams.get('tag');
  const isOfficialBlogParam = searchParams.get('isOfficialBlog');
  const searchParamsValidation = FetchGetSeriesSearchParamsSchema.safeParse({
    seriesCategory: searchParams.get('seriesCategory'),
    appLocale: searchParams.get('appLocale') ?? 'ko',
    tag: tagParam ? decodeURIComponent(tagParam) : undefined,
    isOfficialBlog: isOfficialBlogParam === 'true',
  });
  if (!searchParamsValidation.success) {
    return NextResponse.json({ error: 'search params is not valid' }, { status: 409 });
  }
  const response = await querySeries({
    seriesCategory: searchParamsValidation.data.seriesCategory,
    lang: searchParamsValidation.data.appLocale,
    tag: searchParamsValidation.data.tag,
    isOfficialBlog: Boolean(searchParamsValidation.data.isOfficialBlog),
  });
  return NextResponse.json(response, { status: 200 });
}

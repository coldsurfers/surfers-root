import { querySeriesItem } from 'app/blog/(notion)/query';
import { type NextRequest, NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';
import { FetchGetSeriesItemSearchParamsSchema } from './types';

const notion = new NotionAPI({
  authToken: process.env.NOTION_AUTH_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const searchParams = request.nextUrl.searchParams;
  const seriesCategoryParam = searchParams.get('seriesCategory');
  const appLocaleParam = searchParams.get('appLocale');
  const searchParamsValidation = FetchGetSeriesItemSearchParamsSchema.safeParse({
    seriesCategory: seriesCategoryParam,
    appLocale: appLocaleParam,
  });
  if (!searchParamsValidation.success) {
    return NextResponse.json({ error: 'search params is strange' }, { status: 409 });
  }
  const slug = (await params).slug;
  const page = await querySeriesItem({
    slug,
    lang: searchParamsValidation.data.appLocale,
    seriesCategory: searchParamsValidation.data.seriesCategory,
  });
  if (!page) {
    return NextResponse.json({ message: 'page not found' }, { status: 404 });
  }

  const recordMap = await notion.getPage(page.id, {
    signFileUrls: true,
    fetchMissingBlocks: true,
  });

  return NextResponse.json(
    { page, recordMap },
    {
      status: 200,
    }
  );
}

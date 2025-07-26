import { parseOG } from '@/app/shevil/(utils)';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const getOGInfoRouteQuerystring = z.object({
  siteUrl: z.string().url(),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const siteUrl = searchParams.get('siteUrl');
  const searchParamsValidation = getOGInfoRouteQuerystring.safeParse({
    siteUrl: decodeURIComponent(siteUrl ?? ''),
  });
  if (!searchParamsValidation.success) {
    return NextResponse.json({ error: 'siteUrl query is strange' }, { status: 409 });
  }

  try {
    const response = await parseOG(searchParamsValidation.data.siteUrl);
    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'error fetching og info' }, { status: 500 });
  }
}

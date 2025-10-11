import { queryTags } from 'app/blog/(notion)/query';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const isOfficialBlogParam = request.nextUrl.searchParams.get('isOfficialBlog');
  const tags = await queryTags(isOfficialBlogParam === 'true')();
  return NextResponse.json(
    {
      tags,
    },
    { status: 200 }
  );
}

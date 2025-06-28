import { queryTags } from 'app/blog/(notion)/query';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  const tags = await queryTags();
  return NextResponse.json(
    {
      tags,
    },
    { status: 200 }
  );
}

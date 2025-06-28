import notionInstance from 'app/blog/(notion)/notionInstance';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  const users = await notionInstance.users.list({});
  const { results } = users;
  return NextResponse.json(
    {
      users: results.filter((value) => value.type === 'person'),
    },
    { status: 200 }
  );
}

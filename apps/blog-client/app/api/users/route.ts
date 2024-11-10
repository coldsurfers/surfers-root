import notionInstance from '@/lib/notionInstance'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await notionInstance.users.list({})
  const { results } = users
  return NextResponse.json(
    {
      users: results.filter((value) => value.type === 'person'),
    },
    { status: 200 },
  )
}

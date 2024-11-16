import { queryTags } from '@/features'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const tags = await queryTags()
  return NextResponse.json(
    {
      tags,
    },
    { status: 200 },
  )
}

import { getTags } from '@/features/notion'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const tags = await getTags()
  return NextResponse.json(
    {
      tags,
    },
    { status: 200 },
  )
}

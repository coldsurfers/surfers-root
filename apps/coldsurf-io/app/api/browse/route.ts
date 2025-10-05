import { SITE_URL } from '@/libs/constants'
import { NextResponse } from 'next/server'

export async function GET() {
  const host = SITE_URL
  return NextResponse.redirect(`${host}/browse/seoul`)
}

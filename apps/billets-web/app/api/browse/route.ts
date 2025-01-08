import { NextResponse } from 'next/server'

export async function GET() {
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://billets.coldsurf.io'
  return NextResponse.redirect(`${host}/browse/seoul`)
}

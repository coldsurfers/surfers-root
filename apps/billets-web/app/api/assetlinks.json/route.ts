import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'assets/assetlinks.json')
  const fileContent = await fs.readFile(filePath, 'utf8')

  return new NextResponse(fileContent, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

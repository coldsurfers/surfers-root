import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.join(process.cwd(), 'assets/apple-app-site-association');
  const fileContent = await fs.readFile(filePath, 'utf8');

  return new NextResponse(fileContent, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

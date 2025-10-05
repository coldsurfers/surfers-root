import ky from 'ky';
import type { KyHeadersInit } from 'ky/distribution/types/options';
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const imageUrl = searchParams.get('url');
    const blockId = searchParams.get('id');
    if (!imageUrl) {
      return NextResponse.json({ error: 'url query is strange' }, { status: 409 });
    }
    if (!blockId) {
      return NextResponse.json({ error: 'id query is strange' }, { status: 409 });
    }

    const headers: KyHeadersInit = {
      'Content-Type': 'application/json',
    };

    headers.cookie = `token_v2=${process.env.NOTION_AUTH_TOKEN};file_token=${process.env.NOTION_FILE_TOKEN}`;
    headers['x-notion-active-user-header'] = process.env.NOTION_ACTIVE_USER;

    const response = await ky.post('https://www.notion.so/api/v3/getSignedFileUrls', {
      headers,
      json: {
        urls: [
          {
            permissionRecord: {
              table: 'block',
              id: blockId,
            },
            url: imageUrl,
          },
        ],
      },
    });

    const json = (await response.json()) as {
      signedUrls: string[];
    };
    const { signedUrls } = json;
    const imgResponse = await ky.get(signedUrls[0], {
      headers,
    });
    const buffer = await imgResponse.arrayBuffer();

    const res = new NextResponse(buffer);

    // Set the appropriate content type for the image
    res.headers.set('Content-Type', 'image/jpeg'); // Adjust MIME type (e.g., 'image/png')

    // Optionally, set caching headers if needed
    //   res.headers.set('Cache-Control', 'public, max-age=31536000, immutable') // 1 year cache

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

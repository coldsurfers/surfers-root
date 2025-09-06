import fetch from 'node-fetch';

type KopisCategory =
  | '대중음악'
  | '연극'
  | '서양음악(클래식)'
  | '한국음악(국악)'
  | '뮤지컬'
  | '무용(서양/한국무용)'
  | '대중무용';

async function* fetchSyncKopis(categories: KopisCategory[], pages: number[]) {
  for (const category of categories) {
    for (const page of pages) {
      try {
        console.log('fetching', category, page);
        const response = await fetch('http://127.0.0.1:54321/functions/v1/sync-kopis', {
          method: 'POST',
          body: JSON.stringify({
            category,
            page,
          }),
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch sync kopis: ${category} // ${page} // ${response.status}`
          );
        }
        yield { category, page, ok: true as const, response };
      } catch (e) {
        yield { category, ok: false as const, error: (e as Error).message };
      }
    }
  }
}

async function main() {
  const KOPIS_EVENT_CATEGORIES: KopisCategory[] = [
    '대중음악',
    '연극',
    '서양음악(클래식)',
    '한국음악(국악)',
    '뮤지컬',
    '무용(서양/한국무용)',
    '대중무용',
  ];

  const pages = [1, 2, 3, 4];

  for await (const r of fetchSyncKopis(KOPIS_EVENT_CATEGORIES, pages)) {
    if (!r.ok) {
      console.warn('Failed:', r.category, r.error);
    } else {
      console.log('Success:', r.category, r.page, r.response.status);
    }
  }
}

main();

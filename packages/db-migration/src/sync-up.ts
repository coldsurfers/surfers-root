import fetch from 'node-fetch';
import { runSequentially } from './utils';

async function main() {
  const KOPISEVENT_CATEGORIES = [
    '대중음악',
    '연극',
    '서양음악(클래식)',
    '한국음악(국악)',
    '뮤지컬',
    '무용(서양/한국무용)',
    '대중무용',
  ];

  const pages = [1, 2, 3, 4];

  await runSequentially(
    KOPISEVENT_CATEGORIES.map((category) => {
      return async () => {
        await runSequentially(
          pages.map((page) => {
            return async () => {
              console.log(`FETCHING ${category} ${page}`);
              await fetch('http://127.0.0.1:54321/functions/v1/sync-kopis', {
                method: 'POST',
                body: JSON.stringify({
                  category,
                  page,
                }),
              });
            };
          })
        );
      };
    })
  );
}

main();

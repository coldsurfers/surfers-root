// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

async function migratePostersKeyId() {
  const allPosters = await dbClient.poster.findMany();

  const concurrency = 10;
  let index = 0;
  async function processBatch() {
    const batch = allPosters.slice(index, index + concurrency);
    index += concurrency;
    await Promise.all(
      batch.map(async (poster) => {
        const { imageURL } = poster;
        const [_, key] = imageURL.split('https://api.billets.coldsurf.io/v1/image?key=');
        await dbClient.poster.update({
          where: { id: poster.id },
          data: { keyId: key },
        });
      })
    );
  }
  while (index < allPosters.length) {
    await processBatch();
  }
}

async function migrateDetailImages() {
  const allDetailImages = await dbClient.detailImage.findMany();

  const concurrency = 10;
  let index = 0;
  async function processBatch() {
    const batch = allDetailImages.slice(index, index + concurrency);
    index += concurrency;
    await Promise.all(
      batch.map(async (detailImage) => {
        const { imageURL } = detailImage;
        const [_, key] = imageURL.split('https://api.billets.coldsurf.io/v1/image?key=');
        await dbClient.detailImage.update({
          where: { id: detailImage.id },
          data: { keyId: key },
        });
      })
    );
  }
  while (index < allDetailImages.length) {
    await processBatch();
  }
}

async function syncUp() {
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

  for (const category of KOPISEVENT_CATEGORIES) {
    for (const page of pages) {
      console.log(`FETCHING ${category} ${page}`);
      await fetch('http://127.0.0.1:54321/functions/v1/sync-kopis', {
        method: 'POST',
        body: JSON.stringify({
          category,
          page,
        }),
      });
      console.log(`FETCHED ${category} ${page}`);
    }
  }

  // await migratePostersKeyId();
  // await migrateDetailImages();
}

syncUp();

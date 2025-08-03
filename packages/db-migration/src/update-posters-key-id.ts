import { db } from './db';

async function main() {
  const allPosters = await db.poster.findMany();

  const concurrency = 10;
  let index = 0;
  async function processBatch() {
    const batch = allPosters.slice(index, index + concurrency);
    index += concurrency;
    await Promise.all(
      batch.map(async (poster) => {
        const { imageURL } = poster;
        if (imageURL) {
          const [_, key] = imageURL.split('https://api.billets.coldsurf.io/v1/image?key=');
          await db.poster.update({
            where: { id: poster.id },
            data: { keyId: key },
          });
        }
      })
    );
  }
  while (index < allPosters.length) {
    await processBatch();
  }
}

main();

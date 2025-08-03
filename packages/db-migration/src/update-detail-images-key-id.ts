import { db } from './db';

async function main() {
  const allDetailImages = await db.detailImage.findMany();

  const concurrency = 10;
  let index = 0;
  async function processBatch() {
    const batch = allDetailImages.slice(index, index + concurrency);
    index += concurrency;
    await Promise.all(
      batch.map(async (detailImage) => {
        const { imageURL } = detailImage;
        const [_, key] = imageURL.split('https://api.billets.coldsurf.io/v1/image?key=');
        await db.detailImage.update({
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

main();

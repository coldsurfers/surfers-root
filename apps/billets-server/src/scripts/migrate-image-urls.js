/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function migratePosters() {
  const allPosters = await dbClient.poster.findMany();

  for (const poster of allPosters) {
    const { imageURL } = poster;
    await dbClient.poster.update({
      where: {
        id: poster.id,
      },
      data: {
        imageURL: imageURL.split('&width=')[0],
      },
    });
  }
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function migrateArtistProfileImages() {
  const allArtistProfileImages = await dbClient.artistProfileImage.findMany();

  for (const artistProfileImage of allArtistProfileImages) {
    const { imageURL } = artistProfileImage;
    const [_, key] = imageURL.split('https://abyss.coldsurf.io/');
    await dbClient.artistProfileImage.update({
      where: {
        id: artistProfileImage.id,
      },
      data: {
        imageURL: `https://api.billets.coldsurf.io/v1/image?key=${key}`,
      },
    });
  }
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function restore남부터미널() {
  try {
    // await dbClient.$connect()
    const ids = ['392378e1-1375-4ff2-aeb4-37164c402e6b'];

    await Promise.all(
      ids.map(async (concertId) => {
        const existing = await dbClient.concertsOnVenues.findUnique({
          where: {
            concertId_venueId: {
              concertId,
              venueId: '36939b92-af12-462f-a50d-8061dae5ad26',
            },
          },
        });

        if (existing) {
          await dbClient.concertsOnVenues.delete({
            where: {
              concertId_venueId: {
                concertId,
                venueId: '36939b92-af12-462f-a50d-8061dae5ad26',
              },
            },
          });
        }

        await dbClient.concertsOnVenues.create({
          data: {
            concertId,
            venueId: '3149ac24-9b5d-4130-8bf2-6cbe8cd561f4',
          },
        });
      })
    );
  } catch (e) {
    console.error(e);
  } finally {
    // await dbClient.$disconnect()
  }
}

// restore남부터미널()

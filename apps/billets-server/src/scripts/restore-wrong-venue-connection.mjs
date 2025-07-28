import { PrismaClient } from '@prisma/client';

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

async function restoreConcertsOnVenues() {
  try {
    await dbClient.$connect();
    const ids = [
      // event ids to update
    ];

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
    await dbClient.$disconnect();
  }
}

restoreConcertsOnVenues();

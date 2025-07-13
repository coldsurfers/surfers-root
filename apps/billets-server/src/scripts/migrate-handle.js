/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const { generateSlug } = require('@coldsurfers/shared-utils');

const dbClient = new PrismaClient({
  log: ['warn', 'info', 'error'],
});

async function main() {
  await dbClient.$connect();

  const allUsers = await dbClient.user.findMany({});

  for (const user of allUsers) {
    if (!user.handle) {
      const generateRandomWords = await import('random-words').then((mod) => mod.generate);
      const seedValue = user.email.split('@').at(0) ?? generateRandomWords(2).join(' ');
      const handleValue = await generateSlug(
        seedValue,
        async (newSlug) => {
          const user = await dbClient.user.findUnique({
            where: {
              handle: newSlug,
            },
          });
          return !!user;
        },
        {
          lower: false,
          strict: true,
        }
      );
      await dbClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          handle: handleValue,
        },
      });
    }
  }

  await dbClient.$disconnect();
}

main();

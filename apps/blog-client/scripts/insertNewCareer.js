const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

// eslint-disable-next-line no-unused-vars
async function insertNewCareer({ company, startDate }) {
  await database.career.create({
    data: {
      company,
      startDate,
    },
  })
}

// eslint-disable-next-line no-unused-vars
async function insertNewCareerChapter({ title, careerId, sortOrder }) {
  await database.careerChapter.create({
    data: {
      title,
      careerId,
      sortOrder,
    },
  })
}

// eslint-disable-next-line no-unused-vars
async function insertNewCareerSmallChapter({ careerChapterId, sortOrder, description }) {
  await database.careerSmallChapter.create({
    data: {
      careerChapterId,
      sortOrder,
      description,
    },
  })
}

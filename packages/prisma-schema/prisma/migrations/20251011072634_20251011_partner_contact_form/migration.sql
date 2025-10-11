-- CreateTable
CREATE TABLE "PartnerContactForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "websiteLink" TEXT,
    "message" TEXT NOT NULL,
    "instagramLink" TEXT,
    "twitterLink" TEXT,
    "facebookLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL,

    CONSTRAINT "PartnerContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "platforms" AS ENUM ('ios', 'android');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promoterId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnStaffs" (
    "userId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnStaffs_pkey" PRIMARY KEY ("userId","staffId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "passwordSalt" TEXT,
    "provider" TEXT NOT NULL,
    "deactivatedAt" TIMESTAMP(3),
    "handle" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FCMToken" (
    "id" TEXT NOT NULL,
    "tokenValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FCMToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnFCMTokens" (
    "userId" TEXT NOT NULL,
    "fcmTokenId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersOnFCMTokens_pkey" PRIMARY KEY ("userId","fcmTokenId")
);

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "geohash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "slug" TEXT,
    "memo" TEXT,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promoter" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promoter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistProfileImage" (
    "id" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "copyrightId" TEXT,

    CONSTRAINT "ArtistProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAuthRequest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authcode" TEXT NOT NULL,
    "authenticated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authenticatedAt" TIMESTAMP(3),

    CONSTRAINT "EmailAuthRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAuthorized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "serialNumber" INTEGER NOT NULL,

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concert" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "isKOPIS" BOOLEAN NOT NULL DEFAULT false,
    "locationCityId" TEXT,
    "eventCategoryId" TEXT,
    "slug" TEXT,

    CONSTRAINT "Concert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KOPISEvent" (
    "id" TEXT NOT NULL,
    "concertId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KOPISEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poster" (
    "id" TEXT NOT NULL,
    "imageURL" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "copyrightId" TEXT,
    "keyId" TEXT DEFAULT '',

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailImage" (
    "id" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keyId" TEXT DEFAULT '',

    CONSTRAINT "DetailImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketsOnPrices" (
    "ticketId" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketsOnPrices_pkey" PRIMARY KEY ("ticketId","priceId")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "openDate" TIMESTAMP(3) NOT NULL,
    "seller" TEXT NOT NULL,
    "sellingURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceCurrency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConcertsOnArtists" (
    "concertId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcertsOnArtists_pkey" PRIMARY KEY ("concertId","artistId")
);

-- CreateTable
CREATE TABLE "ConcertsOnVenues" (
    "concertId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcertsOnVenues_pkey" PRIMARY KEY ("concertId","venueId")
);

-- CreateTable
CREATE TABLE "ConcertsOnPosters" (
    "concertId" TEXT NOT NULL,
    "posterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcertsOnPosters_pkey" PRIMARY KEY ("concertId","posterId")
);

-- CreateTable
CREATE TABLE "ConcertsOnTickets" (
    "concertId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcertsOnTickets_pkey" PRIMARY KEY ("concertId","ticketId")
);

-- CreateTable
CREATE TABLE "ConcertsOnDetailImages" (
    "concertId" TEXT NOT NULL,
    "detailImageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConcertsOnDetailImages_pkey" PRIMARY KEY ("concertId","detailImageId")
);

-- CreateTable
CREATE TABLE "UsersOnSubscribedConcerts" (
    "userId" TEXT NOT NULL,
    "concertId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnSubscribedConcerts_pkey" PRIMARY KEY ("userId","concertId")
);

-- CreateTable
CREATE TABLE "UsersOnSubscribedArtists" (
    "userId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnSubscribedArtists_pkey" PRIMARY KEY ("userId","artistId")
);

-- CreateTable
CREATE TABLE "UsersOnSubscribedVenues" (
    "userId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnSubscribedVenues_pkey" PRIMARY KEY ("userId","venueId")
);

-- CreateTable
CREATE TABLE "Copyright" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "licenseURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Copyright_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationCity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "geohash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uiName" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "serialNumber" INTEGER,

    CONSTRAINT "LocationCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationCountry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uiName" TEXT NOT NULL,

    CONSTRAINT "LocationCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationCitiesOnLocationCountries" (
    "locationCountryId" TEXT NOT NULL,
    "locationCityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocationCitiesOnLocationCountries_pkey" PRIMARY KEY ("locationCountryId","locationCityId")
);

-- CreateTable
CREATE TABLE "bundles" (
    "id" UUID NOT NULL,
    "platform" "platforms" NOT NULL,
    "target_app_version" TEXT NOT NULL,
    "should_force_update" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_hash" TEXT NOT NULL,
    "git_commit_hash" TEXT,
    "message" TEXT,

    CONSTRAINT "bundles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "FCMToken_tokenValue_key" ON "FCMToken"("tokenValue");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_slug_key" ON "Venue"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventCategory_name_key" ON "EventCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Concert_slug_key" ON "Concert"("slug");

-- CreateIndex
CREATE INDEX "common_concert_list_index" ON "Concert"("locationCityId", "date", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "KOPISEvent_concertId_key" ON "KOPISEvent"("concertId");

-- CreateIndex
CREATE UNIQUE INDEX "LocationCity_name_key" ON "LocationCity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LocationCountry_name_key" ON "LocationCountry"("name");

-- CreateIndex
CREATE INDEX "bundles_target_app_version_idx" ON "bundles"("target_app_version");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_promoterId_fkey" FOREIGN KEY ("promoterId") REFERENCES "Promoter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnStaffs" ADD CONSTRAINT "UsersOnStaffs_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnStaffs" ADD CONSTRAINT "UsersOnStaffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnFCMTokens" ADD CONSTRAINT "UsersOnFCMTokens_fcmTokenId_fkey" FOREIGN KEY ("fcmTokenId") REFERENCES "FCMToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnFCMTokens" ADD CONSTRAINT "UsersOnFCMTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistProfileImage" ADD CONSTRAINT "ArtistProfileImage_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistProfileImage" ADD CONSTRAINT "ArtistProfileImage_copyrightId_fkey" FOREIGN KEY ("copyrightId") REFERENCES "Copyright"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concert" ADD CONSTRAINT "Concert_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "EventCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concert" ADD CONSTRAINT "Concert_locationCityId_fkey" FOREIGN KEY ("locationCityId") REFERENCES "LocationCity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KOPISEvent" ADD CONSTRAINT "KOPISEvent_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poster" ADD CONSTRAINT "Poster_copyrightId_fkey" FOREIGN KEY ("copyrightId") REFERENCES "Copyright"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsOnPrices" ADD CONSTRAINT "TicketsOnPrices_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsOnPrices" ADD CONSTRAINT "TicketsOnPrices_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnArtists" ADD CONSTRAINT "ConcertsOnArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnArtists" ADD CONSTRAINT "ConcertsOnArtists_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnVenues" ADD CONSTRAINT "ConcertsOnVenues_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnVenues" ADD CONSTRAINT "ConcertsOnVenues_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnPosters" ADD CONSTRAINT "ConcertsOnPosters_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnPosters" ADD CONSTRAINT "ConcertsOnPosters_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Poster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnTickets" ADD CONSTRAINT "ConcertsOnTickets_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnTickets" ADD CONSTRAINT "ConcertsOnTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnDetailImages" ADD CONSTRAINT "ConcertsOnDetailImages_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertsOnDetailImages" ADD CONSTRAINT "ConcertsOnDetailImages_detailImageId_fkey" FOREIGN KEY ("detailImageId") REFERENCES "DetailImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSubscribedConcerts" ADD CONSTRAINT "UsersOnSubscribedConcerts_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSubscribedConcerts" ADD CONSTRAINT "UsersOnSubscribedConcerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSubscribedArtists" ADD CONSTRAINT "UsersOnSubscribedArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSubscribedArtists" ADD CONSTRAINT "UsersOnSubscribedArtists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSubscribedVenues" ADD CONSTRAINT "UsersOnSubscribedVenues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSubscribedVenues" ADD CONSTRAINT "UsersOnSubscribedVenues_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationCitiesOnLocationCountries" ADD CONSTRAINT "LocationCitiesOnLocationCountries_locationCityId_fkey" FOREIGN KEY ("locationCityId") REFERENCES "LocationCity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationCitiesOnLocationCountries" ADD CONSTRAINT "LocationCitiesOnLocationCountries_locationCountryId_fkey" FOREIGN KEY ("locationCountryId") REFERENCES "LocationCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


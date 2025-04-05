

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";








ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."platforms" AS ENUM (
    'ios',
    'android'
);


ALTER TYPE "public"."platforms" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_update_info"("app_platform" "public"."platforms", "app_version" "text", "bundle_id" "uuid") RETURNS TABLE("id" "uuid", "should_force_update" boolean, "file_url" "text", "file_hash" "text", "status" "text")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    NIL_UUID CONSTANT uuid := '00000000-0000-0000-0000-000000000000';
BEGIN
    RETURN QUERY
    WITH rollback_candidate AS (
        SELECT
            b.id,
            -- If status is 'ROLLBACK', should_force_update is always TRUE
            TRUE AS should_force_update,
            b.file_url,
            b.file_hash,
            'ROLLBACK' AS status
        FROM bundles b
        WHERE b.enabled = TRUE
          AND b.platform = app_platform
          AND b.id < bundle_id
        ORDER BY b.id DESC
        LIMIT 1
    ),
    update_candidate AS (
        SELECT
            b.id,
            b.should_force_update,
            b.file_url,
            b.file_hash,
            'UPDATE' AS status
        FROM bundles b
        WHERE b.enabled = TRUE
          AND b.platform = app_platform
          AND b.id >= bundle_id
          AND semver_satisfies(b.target_app_version, app_version)
        ORDER BY b.id DESC
        LIMIT 1
    ),
    final_result AS (
        SELECT *
        FROM update_candidate

        UNION ALL

        SELECT *
        FROM rollback_candidate
        WHERE NOT EXISTS (SELECT 1 FROM update_candidate)
    )
    SELECT *
    FROM final_result WHERE final_result.id != bundle_id

    UNION ALL
    /*
      When there are no final results and bundle_id != NIL_UUID,
      add one fallback row.
      This fallback row is also ROLLBACK so shouldForceUpdate = TRUE.
    */
    SELECT
        NIL_UUID      AS id,
        TRUE          AS should_force_update,  -- Always TRUE
        NULL          AS file_url,
        NULL          AS file_hash,
        'ROLLBACK'    AS status
    WHERE (SELECT COUNT(*) FROM final_result) = 0
      AND bundle_id != NIL_UUID;

END;
$$;


ALTER FUNCTION "public"."get_update_info"("app_platform" "public"."platforms", "app_version" "text", "bundle_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."semver_satisfies"("range_expression" "text", "version" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
    version_parts TEXT[];
    version_major INT;
    version_minor INT;
    version_patch INT;
    satisfies BOOLEAN := FALSE;
BEGIN
    -- Split the version into major, minor, and patch
    version_parts := string_to_array(version, '.');
    version_major := version_parts[1]::INT;
    version_minor := version_parts[2]::INT;
    version_patch := version_parts[3]::INT;

    -- Parse range expression and evaluate
    IF range_expression ~ '^\d+\.\d+\.\d+$' THEN
        -- Exact match
        satisfies := (range_expression = version);

    ELSIF range_expression = '*' THEN
        -- Matches any version
        satisfies := TRUE;

    ELSIF range_expression ~ '^\d+\.x\.x$' THEN
        -- Matches major.x.x
        DECLARE
            major_range INT := split_part(range_expression, '.', 1)::INT;
        BEGIN
            satisfies := (version_major = major_range);
        END;

    ELSIF range_expression ~ '^\d+\.\d+\.x$' THEN
        -- Matches major.minor.x
        DECLARE
            major_range INT := split_part(range_expression, '.', 1)::INT;
            minor_range INT := split_part(range_expression, '.', 2)::INT;
        BEGIN
            satisfies := (version_major = major_range AND version_minor = minor_range);
        END;

    ELSIF range_expression ~ '^\d+\.\d+$' THEN
        -- Matches major.minor
        DECLARE
            major_range INT := split_part(range_expression, '.', 1)::INT;
            minor_range INT := split_part(range_expression, '.', 2)::INT;
        BEGIN
            satisfies := (version_major = major_range AND version_minor = minor_range);
        END;

    ELSIF range_expression ~ '^\d+\.\d+\.\d+ - \d+\.\d+\.\d+$' THEN
        -- Matches range e.g., 1.2.3 - 1.2.7
        DECLARE
            lower_bound TEXT := split_part(range_expression, ' - ', 1);
            upper_bound TEXT := split_part(range_expression, ' - ', 2);
        BEGIN
            satisfies := (version >= lower_bound AND version <= upper_bound);
        END;

    ELSIF range_expression ~ '^>=\d+\.\d+\.\d+ <\d+\.\d+\.\d+$' THEN
        -- Matches range with inequalities
        DECLARE
            lower_bound TEXT := regexp_replace(range_expression, '>=([\d\.]+) <.*', '\1');
            upper_bound TEXT := regexp_replace(range_expression, '.*<([\d\.]+)', '\1');
        BEGIN
            satisfies := (version >= lower_bound AND version < upper_bound);
        END;

    ELSIF range_expression ~ '^~\d+\.\d+\.\d+$' THEN
        -- Matches ~1.2.3 (>=1.2.3 <1.3.0)
        DECLARE
            lower_bound TEXT := regexp_replace(range_expression, '~', '');
            upper_bound_major INT := split_part(lower_bound, '.', 1)::INT;
            upper_bound_minor INT := split_part(lower_bound, '.', 2)::INT + 1;
            upper_bound TEXT := upper_bound_major || '.' || upper_bound_minor || '.0';
        BEGIN
            satisfies := (version >= lower_bound AND version < upper_bound);
        END;

    ELSIF range_expression ~ '^\^\d+\.\d+\.\d+$' THEN
        -- Matches ^1.2.3 (>=1.2.3 <2.0.0)
        DECLARE
            lower_bound TEXT := regexp_replace(range_expression, '\^', '');
            upper_bound_major INT := split_part(lower_bound, '.', 1)::INT + 1;
            upper_bound TEXT := upper_bound_major || '.0.0';
        BEGIN
            satisfies := (version >= lower_bound AND version < upper_bound);
        END;

    -- [Added] 1) Single major version pattern '^(\d+)$'
    ELSIF range_expression ~ '^\d+$' THEN
        /*
            e.g.) "1" is interpreted as (>=1.0.0 <2.0.0) in semver range
                  "2" would be interpreted as (>=2.0.0 <3.0.0)
         */
        DECLARE
            major_range INT := range_expression::INT;
            lower_bound TEXT := major_range || '.0.0';
            upper_bound TEXT := (major_range + 1) || '.0.0';
        BEGIN
            satisfies := (version >= lower_bound AND version < upper_bound);
        END;

    -- [Added] 2) major.x pattern '^(\d+)\.x$'
    ELSIF range_expression ~ '^\d+\.x$' THEN
        /*
            e.g.) "2.x" => as long as major=2 matches, any minor and patch is OK
                  effectively works like (>=2.0.0 <3.0.0)
         */
        DECLARE
            major_range INT := split_part(range_expression, '.', 1)::INT;
            lower_bound TEXT := major_range || '.0.0';
            upper_bound TEXT := (major_range + 1) || '.0.0';
        BEGIN
            satisfies := (version >= lower_bound AND version < upper_bound);
        END;

    ELSE
        RAISE EXCEPTION 'Unsupported range expression: %', range_expression;
    END IF;

    RETURN satisfies;
END;
$_$;


ALTER FUNCTION "public"."semver_satisfies"("range_expression" "text", "version" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Artist" (
    "id" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."Artist" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ArtistProfileImage" (
    "id" "text" NOT NULL,
    "imageURL" "text" NOT NULL,
    "artistId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "copyrightId" "text"
);


ALTER TABLE "public"."ArtistProfileImage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."AuthToken" (
    "id" "text" NOT NULL,
    "access_token" "text" NOT NULL,
    "refresh_token" "text" NOT NULL,
    "user_id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."AuthToken" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Concert" (
    "id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "date" timestamp with time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    "deletedAt" timestamp(3) without time zone,
    "isKOPIS" boolean DEFAULT false NOT NULL,
    "locationCityId" "text",
    "eventCategoryId" "text",
    "slug" "text"
);


ALTER TABLE "public"."Concert" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ConcertsOnArtists" (
    "concertId" "text" NOT NULL,
    "artistId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."ConcertsOnArtists" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ConcertsOnPosters" (
    "concertId" "text" NOT NULL,
    "posterId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."ConcertsOnPosters" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ConcertsOnTickets" (
    "concertId" "text" NOT NULL,
    "ticketId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."ConcertsOnTickets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ConcertsOnVenues" (
    "concertId" "text" NOT NULL,
    "venueId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."ConcertsOnVenues" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Copyright" (
    "id" "text" NOT NULL,
    "owner" "text" NOT NULL,
    "license" "text" NOT NULL,
    "licenseURL" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Copyright" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."EmailAuthRequest" (
    "id" "text" NOT NULL,
    "email" "text" NOT NULL,
    "authcode" "text" NOT NULL,
    "authenticated" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "authenticatedAt" timestamp(3) without time zone
);


ALTER TABLE "public"."EmailAuthRequest" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Event" (
    "id" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "promoterId" integer
);


ALTER TABLE "public"."Event" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."EventCategory" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "serialNumber" integer NOT NULL
);


ALTER TABLE "public"."EventCategory" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."Event_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."Event_id_seq" OWNED BY "public"."Event"."id";



CREATE TABLE IF NOT EXISTS "public"."FCMToken" (
    "id" "text" NOT NULL,
    "tokenValue" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."FCMToken" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."KOPISEvent" (
    "id" "text" NOT NULL,
    "concertId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."KOPISEvent" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."LocationCitiesOnLocationCountries" (
    "locationCountryId" "text" NOT NULL,
    "locationCityId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."LocationCitiesOnLocationCountries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."LocationCity" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "lat" double precision NOT NULL,
    "lng" double precision NOT NULL,
    "geohash" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "uiName" "text" NOT NULL,
    "disabled" boolean DEFAULT false NOT NULL,
    "serialNumber" integer
);


ALTER TABLE "public"."LocationCity" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."LocationCountry" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "lat" double precision,
    "lng" double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "uiName" "text" NOT NULL
);


ALTER TABLE "public"."LocationCountry" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Poster" (
    "id" "text" NOT NULL,
    "imageURL" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "copyrightId" "text"
);


ALTER TABLE "public"."Poster" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Price" (
    "id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "price" double precision NOT NULL,
    "priceCurrency" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Price" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Promoter" (
    "id" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Promoter" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."Promoter_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."Promoter_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."Promoter_id_seq" OWNED BY "public"."Promoter"."id";



CREATE TABLE IF NOT EXISTS "public"."Staff" (
    "id" "text" NOT NULL,
    "created_at" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isAuthorized" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."Staff" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Ticket" (
    "id" "text" NOT NULL,
    "openDate" timestamp(3) without time zone NOT NULL,
    "seller" "text" NOT NULL,
    "sellingURL" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Ticket" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."TicketsOnPrices" (
    "ticketId" "text" NOT NULL,
    "priceId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."TicketsOnPrices" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."User" (
    "id" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "email" "text" NOT NULL,
    "password" "text",
    "passwordSalt" "text",
    "provider" "text" NOT NULL,
    "deactivatedAt" timestamp(3) without time zone
);


ALTER TABLE "public"."User" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UsersOnFCMTokens" (
    "userId" "text" NOT NULL,
    "fcmTokenId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."UsersOnFCMTokens" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UsersOnStaffs" (
    "userId" "text" NOT NULL,
    "staffId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."UsersOnStaffs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UsersOnSubscribedArtists" (
    "userId" "text" NOT NULL,
    "artistId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."UsersOnSubscribedArtists" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UsersOnSubscribedConcerts" (
    "userId" "text" NOT NULL,
    "concertId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."UsersOnSubscribedConcerts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UsersOnSubscribedVenues" (
    "userId" "text" NOT NULL,
    "venueId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."UsersOnSubscribedVenues" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Venue" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "lat" double precision NOT NULL,
    "lng" double precision NOT NULL,
    "geohash" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "address" "text" NOT NULL
);


ALTER TABLE "public"."Venue" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bundles" (
    "id" "uuid" NOT NULL,
    "platform" "public"."platforms" NOT NULL,
    "target_app_version" "text" NOT NULL,
    "should_force_update" boolean NOT NULL,
    "enabled" boolean NOT NULL,
    "file_url" "text" NOT NULL,
    "file_hash" "text" NOT NULL,
    "git_commit_hash" "text",
    "message" "text"
);


ALTER TABLE "public"."bundles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Event" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Event_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."Promoter" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Promoter_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."ArtistProfileImage"
    ADD CONSTRAINT "ArtistProfileImage_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Artist"
    ADD CONSTRAINT "Artist_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."AuthToken"
    ADD CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Concert"
    ADD CONSTRAINT "Concert_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ConcertsOnArtists"
    ADD CONSTRAINT "ConcertsOnArtists_pkey" PRIMARY KEY ("concertId", "artistId");



ALTER TABLE ONLY "public"."ConcertsOnPosters"
    ADD CONSTRAINT "ConcertsOnPosters_pkey" PRIMARY KEY ("concertId", "posterId");



ALTER TABLE ONLY "public"."ConcertsOnTickets"
    ADD CONSTRAINT "ConcertsOnTickets_pkey" PRIMARY KEY ("concertId", "ticketId");



ALTER TABLE ONLY "public"."ConcertsOnVenues"
    ADD CONSTRAINT "ConcertsOnVenues_pkey" PRIMARY KEY ("concertId", "venueId");



ALTER TABLE ONLY "public"."Copyright"
    ADD CONSTRAINT "Copyright_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."EmailAuthRequest"
    ADD CONSTRAINT "EmailAuthRequest_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."EventCategory"
    ADD CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."FCMToken"
    ADD CONSTRAINT "FCMToken_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."KOPISEvent"
    ADD CONSTRAINT "KOPISEvent_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."LocationCitiesOnLocationCountries"
    ADD CONSTRAINT "LocationCitiesOnLocationCountries_pkey" PRIMARY KEY ("locationCountryId", "locationCityId");



ALTER TABLE ONLY "public"."LocationCity"
    ADD CONSTRAINT "LocationCity_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."LocationCountry"
    ADD CONSTRAINT "LocationCountry_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Poster"
    ADD CONSTRAINT "Poster_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Price"
    ADD CONSTRAINT "Price_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Promoter"
    ADD CONSTRAINT "Promoter_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Staff"
    ADD CONSTRAINT "Staff_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."TicketsOnPrices"
    ADD CONSTRAINT "TicketsOnPrices_pkey" PRIMARY KEY ("ticketId", "priceId");



ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."UsersOnFCMTokens"
    ADD CONSTRAINT "UsersOnFCMTokens_pkey" PRIMARY KEY ("userId", "fcmTokenId");



ALTER TABLE ONLY "public"."UsersOnStaffs"
    ADD CONSTRAINT "UsersOnStaffs_pkey" PRIMARY KEY ("userId", "staffId");



ALTER TABLE ONLY "public"."UsersOnSubscribedArtists"
    ADD CONSTRAINT "UsersOnSubscribedArtists_pkey" PRIMARY KEY ("userId", "artistId");



ALTER TABLE ONLY "public"."UsersOnSubscribedConcerts"
    ADD CONSTRAINT "UsersOnSubscribedConcerts_pkey" PRIMARY KEY ("userId", "concertId");



ALTER TABLE ONLY "public"."UsersOnSubscribedVenues"
    ADD CONSTRAINT "UsersOnSubscribedVenues_pkey" PRIMARY KEY ("userId", "venueId");



ALTER TABLE ONLY "public"."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bundles"
    ADD CONSTRAINT "bundles_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "Concert_slug_key" ON "public"."Concert" USING "btree" ("slug");



CREATE UNIQUE INDEX "EventCategory_name_key" ON "public"."EventCategory" USING "btree" ("name");



CREATE UNIQUE INDEX "FCMToken_tokenValue_key" ON "public"."FCMToken" USING "btree" ("tokenValue");



CREATE UNIQUE INDEX "KOPISEvent_concertId_key" ON "public"."KOPISEvent" USING "btree" ("concertId");



CREATE UNIQUE INDEX "LocationCity_name_key" ON "public"."LocationCity" USING "btree" ("name");



CREATE UNIQUE INDEX "LocationCountry_name_key" ON "public"."LocationCountry" USING "btree" ("name");



CREATE UNIQUE INDEX "User_email_key" ON "public"."User" USING "btree" ("email");



CREATE INDEX "bundles_target_app_version_idx" ON "public"."bundles" USING "btree" ("target_app_version");



CREATE INDEX "common_concert_list_index" ON "public"."Concert" USING "btree" ("locationCityId", "date", "deletedAt");



ALTER TABLE ONLY "public"."ArtistProfileImage"
    ADD CONSTRAINT "ArtistProfileImage_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "public"."Artist"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ArtistProfileImage"
    ADD CONSTRAINT "ArtistProfileImage_copyrightId_fkey" FOREIGN KEY ("copyrightId") REFERENCES "public"."Copyright"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."AuthToken"
    ADD CONSTRAINT "AuthToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."Concert"
    ADD CONSTRAINT "Concert_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "public"."EventCategory"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Concert"
    ADD CONSTRAINT "Concert_locationCityId_fkey" FOREIGN KEY ("locationCityId") REFERENCES "public"."LocationCity"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."ConcertsOnArtists"
    ADD CONSTRAINT "ConcertsOnArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "public"."Artist"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConcertsOnArtists"
    ADD CONSTRAINT "ConcertsOnArtists_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "public"."Concert"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConcertsOnPosters"
    ADD CONSTRAINT "ConcertsOnPosters_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "public"."Concert"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConcertsOnPosters"
    ADD CONSTRAINT "ConcertsOnPosters_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "public"."Poster"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConcertsOnTickets"
    ADD CONSTRAINT "ConcertsOnTickets_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "public"."Concert"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConcertsOnTickets"
    ADD CONSTRAINT "ConcertsOnTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."Ticket"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConcertsOnVenues"
    ADD CONSTRAINT "ConcertsOnVenues_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "public"."Concert"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConcertsOnVenues"
    ADD CONSTRAINT "ConcertsOnVenues_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Event"
    ADD CONSTRAINT "Event_promoterId_fkey" FOREIGN KEY ("promoterId") REFERENCES "public"."Promoter"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."KOPISEvent"
    ADD CONSTRAINT "KOPISEvent_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "public"."Concert"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."LocationCitiesOnLocationCountries"
    ADD CONSTRAINT "LocationCitiesOnLocationCountries_locationCityId_fkey" FOREIGN KEY ("locationCityId") REFERENCES "public"."LocationCity"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."LocationCitiesOnLocationCountries"
    ADD CONSTRAINT "LocationCitiesOnLocationCountries_locationCountryId_fkey" FOREIGN KEY ("locationCountryId") REFERENCES "public"."LocationCountry"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Poster"
    ADD CONSTRAINT "Poster_copyrightId_fkey" FOREIGN KEY ("copyrightId") REFERENCES "public"."Copyright"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."TicketsOnPrices"
    ADD CONSTRAINT "TicketsOnPrices_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "public"."Price"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."TicketsOnPrices"
    ADD CONSTRAINT "TicketsOnPrices_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."Ticket"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnFCMTokens"
    ADD CONSTRAINT "UsersOnFCMTokens_fcmTokenId_fkey" FOREIGN KEY ("fcmTokenId") REFERENCES "public"."FCMToken"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnFCMTokens"
    ADD CONSTRAINT "UsersOnFCMTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnStaffs"
    ADD CONSTRAINT "UsersOnStaffs_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnStaffs"
    ADD CONSTRAINT "UsersOnStaffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnSubscribedArtists"
    ADD CONSTRAINT "UsersOnSubscribedArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "public"."Artist"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnSubscribedArtists"
    ADD CONSTRAINT "UsersOnSubscribedArtists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnSubscribedConcerts"
    ADD CONSTRAINT "UsersOnSubscribedConcerts_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "public"."Concert"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnSubscribedConcerts"
    ADD CONSTRAINT "UsersOnSubscribedConcerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnSubscribedVenues"
    ADD CONSTRAINT "UsersOnSubscribedVenues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UsersOnSubscribedVenues"
    ADD CONSTRAINT "UsersOnSubscribedVenues_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON UPDATE CASCADE ON DELETE RESTRICT;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


















































































































































































































GRANT ALL ON TABLE "public"."Artist" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Artist" TO "anon";



GRANT ALL ON TABLE "public"."ArtistProfileImage" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."ArtistProfileImage" TO "anon";



GRANT ALL ON TABLE "public"."AuthToken" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."AuthToken" TO "anon";



GRANT ALL ON TABLE "public"."Concert" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Concert" TO "anon";



GRANT ALL ON TABLE "public"."ConcertsOnArtists" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."ConcertsOnArtists" TO "anon";



GRANT ALL ON TABLE "public"."ConcertsOnPosters" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."ConcertsOnPosters" TO "anon";



GRANT ALL ON TABLE "public"."ConcertsOnTickets" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."ConcertsOnTickets" TO "anon";



GRANT ALL ON TABLE "public"."ConcertsOnVenues" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."ConcertsOnVenues" TO "anon";



GRANT ALL ON TABLE "public"."Copyright" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Copyright" TO "anon";



GRANT ALL ON TABLE "public"."EmailAuthRequest" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."EmailAuthRequest" TO "anon";



GRANT ALL ON TABLE "public"."Event" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Event" TO "anon";



GRANT ALL ON TABLE "public"."EventCategory" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."EventCategory" TO "anon";



GRANT ALL ON TABLE "public"."FCMToken" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."FCMToken" TO "anon";



GRANT ALL ON TABLE "public"."KOPISEvent" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."KOPISEvent" TO "anon";



GRANT ALL ON TABLE "public"."LocationCitiesOnLocationCountries" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."LocationCitiesOnLocationCountries" TO "anon";



GRANT ALL ON TABLE "public"."LocationCity" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."LocationCity" TO "anon";



GRANT ALL ON TABLE "public"."LocationCountry" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."LocationCountry" TO "anon";



GRANT ALL ON TABLE "public"."Poster" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Poster" TO "anon";



GRANT ALL ON TABLE "public"."Price" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Price" TO "anon";



GRANT ALL ON TABLE "public"."Promoter" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Promoter" TO "anon";



GRANT ALL ON TABLE "public"."Staff" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Staff" TO "anon";



GRANT ALL ON TABLE "public"."Ticket" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Ticket" TO "anon";



GRANT ALL ON TABLE "public"."TicketsOnPrices" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."TicketsOnPrices" TO "anon";



GRANT ALL ON TABLE "public"."User" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."User" TO "anon";



GRANT ALL ON TABLE "public"."UsersOnFCMTokens" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."UsersOnFCMTokens" TO "anon";



GRANT ALL ON TABLE "public"."UsersOnStaffs" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."UsersOnStaffs" TO "anon";



GRANT ALL ON TABLE "public"."UsersOnSubscribedArtists" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."UsersOnSubscribedArtists" TO "anon";



GRANT ALL ON TABLE "public"."UsersOnSubscribedConcerts" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."UsersOnSubscribedConcerts" TO "anon";



GRANT ALL ON TABLE "public"."UsersOnSubscribedVenues" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."UsersOnSubscribedVenues" TO "anon";



GRANT ALL ON TABLE "public"."Venue" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."Venue" TO "anon";



GRANT ALL ON TABLE "public"."bundles" TO "service_role";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."bundles" TO "anon";



























RESET ALL;

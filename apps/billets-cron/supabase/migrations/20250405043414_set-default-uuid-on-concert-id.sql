-- Enable pgcrypto if not already enabled
create extension if not exists "pgcrypto";

-- Set default uuid generation
alter table "Concert"
alter column "id"
set default gen_random_uuid();

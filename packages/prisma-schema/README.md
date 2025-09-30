# @coldsurfers/prisma-schema

## How to migrate with prisma

```bash
$ pnpm prisma migrate deploy
```

## Pull from origin DB

```bash
$ pnpm prisma db pull
```

## Rollback migration

```bash
$ pnpm prisma migrate --rolled-back MIGRATION_NAME
```

# felix-api

## Dev

### 1. Create `.env` file

```.sh
cp .env-sample.txt .env
```

### 2. Set up MySQL

```.sh
docker-compose up -d
```

### 3. Install modules

```.sh
pnpm install
```

### 4. Start coding

```.sh

# Insert the data that existing data and plan.
pnpm prisma:prepare

pnpm dev
```

## DB migration

### Usage

`$ prisma migrate [command] [options]`

### Commands for development

- dev: Create a migration from changes in Prisma schema, apply it to the database trigger generators (e.g. Prisma Client)
- reset: Reset your database and apply all migrations, all data will be lost

### Commands for production/staging

- deploy: Apply pending migrations to the database
- status: Check the status of your database migrations
- resolve: Resolve issues with database migrations, i.e. baseline, failed migration, hotfix

### Command for any stage

- diff: Compare the database schema from two arbitrary sources

### Options

```.sh
-h, --help   Display this help message

--schema   Custom path to your Prisma schema
```

### Examples

Create a migration from changes in Prisma schema, apply it to the database, trigger generators (e.g. Prisma Client)

```.sh
$ prisma migrate dev
```

Reset your database and apply all migrations

```.sh
$ prisma migrate reset
```

Apply pending migrations to the database in production/staging

```.sh
$ prisma migrate deploy
```

Check the status of migrations in the production/staging database

```.sh
$ prisma migrate status
```

Specify a schema

```.sh
$ prisma migrate status --schema=./schema.prisma
```

Compare the database schema from two databases and render the diff as a SQL script

```.sh
$ prisma migrate diff \
    --from-url "$DATABASE_URL" \
    --to-url "postgresql://login:password@localhost:5432/db" \
    --script
```

---

## Modules

- [express](https://expressjs.com/en/5x/api.html)
- [prisma](https://www.prisma.io/)
- [consola](https://github.com/unjs/consola)
- [vitest](https://vitest.dev/)
- [tsx](https://github.com/esbuild-kit/tsx)
- [firebase](https://github.com/firebase/firebase-js-sdk)
- [zod](https://zod.dev/)

## Recommended Softwares

- [Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)
- [Sequel Ace](https://apps.apple.com/us/app/sequel-ace/id1518036000?mt=12)

---

## Note

### Proper Database status in Docker Desktop

After `docker-compose up -d`:

#### Containers

<img src="./docs/img/docker-status-container.png" />

#### Images

<img src="./docs/img/docker-status-images.png" />

#### Volumes

<img src="./docs/img/docker-status-volumes.png" />

### Login local MySQL with Sequel Ace

<img src="./docs/img/sequel-ace-login.png" />

- Name: Whatever you want.
- Host: `127.0.01`
- Username: `docker`
- Password: `docker`
- Port: `3306`

<img src="./docs/img/sequel-ace-table.png" />

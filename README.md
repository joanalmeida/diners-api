## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Setup

If using VSCode, setup typescript to use the same as the proyect (CTRL + P -> '>Typescript: Select Typescript Version... -> Use Workspace version')

# Prisma

pnpm prisma migrate dev
pnpm prisma studio
pnpm prisma migrate reset (when adding new schema data)

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

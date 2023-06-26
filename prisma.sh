#!/usr/bin/env sh

pnpm prisma:generate && pnpm prisma:migrate && pnpm seed:prod && node dist/index.js

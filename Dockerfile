# syntax=docker/dockerfile:1

FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN bunx prisma generate

COPY tsconfig.json .
COPY src ./src

EXPOSE 8080

CMD ["sh", "-c", "bunx prisma db push && bun run start"]

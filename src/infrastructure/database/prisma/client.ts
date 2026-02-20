import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
  timestampFormat: "unixepoch-ms"
});

export const prisma = new PrismaClient({ adapter });

import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";

// Bun loads .env files relative to the process working directory. The backend
// imports this package from a different directory, so also load the package's
// local .env as a development fallback. A deployed DATABASE_URL always wins.
config({
  path: fileURLToPath(new URL(".env", import.meta.url)),
});

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not configured. Set it in the environment or packages/db/.env.",
  );
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
});

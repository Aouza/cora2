import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./src/db/schema/**.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;

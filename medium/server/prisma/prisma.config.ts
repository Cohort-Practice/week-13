// prisma.config.ts
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    // Use adapter for direct DB connection
    adapter: {
      url: process.env.DATABASE_URL!,
    },

    // OR use accelerateUrl if you’re using Prisma Accelerate
    // accelerateUrl: process.env.ACCELERATE_URL!,
  },
});
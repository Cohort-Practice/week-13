# making a simple medium application with prisma,aivian and hono.

### steps of creating a server with ( signin , signup , post ) endpoints
 - cd server
 - npm create hono@latest


generator client {
  provider = "prisma-client-js"
   binaryTargets = ["native"]
}

datasource db {
  provider = "postgresql"
}

model User {
  id       Int    @id @default(autoincrement())
  username   String     @unique
  name     String?     
  password String
  blogs    Blog[]
}

model Blog {
  id          Int     @id @default(autoincrement())
  authorId    Int
  content     String    
  tittle      String 
  published   Boolean    @default(false)
  author      User       @relation(fields: [authorId] , references: [id])
}


import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      // Direct DB connection
      adapter: "postgresql",
      url: process.env.DATABASE_URL!, // Wrangler injects this at runtime
    },

    // If you want to use Prisma Accelerate instead:
    // db: {
    //   accelerateUrl: process.env.ACCELERATE_URL!,
    // },
  },
});


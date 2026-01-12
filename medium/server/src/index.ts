import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

const body = await c.req.json();
const password = await c.req.json();

await prisma.user.create({
    data : {
        email : body.email,
        password : body.password
    },
})
  return c.text("Helooooo Signup");
});

app.post("/api/v1/signin", (c) => {});

app.put("/api/v1/blog", (c) => {});

app.get("/api/v1/blog/:id", (c) => {});

export default app;

import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoutes from "./src/routers/user";
import blogRoutes from "./src/routers/blog";

const app = new Hono();

app.use("*",cors());

app.get("/", (c) => c.text("Server Running..."));

app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};

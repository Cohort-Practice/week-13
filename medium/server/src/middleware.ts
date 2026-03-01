import { verify } from "jsonwebtoken";
import { Context, Next } from "hono";

export async function auth(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "secret") as {
      id: number;
    };

    c.set("userId", decoded.id);

    await next();
  } catch {
    c.status(401);
    return c.json({ error: "Invalid token" });
  }
}

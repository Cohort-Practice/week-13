import { Hono } from "hono";
import { pool } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const user = new Hono();

user.post("/signup", async (c) => {
  const { username, email, password } = await c.req.json();

  if (!username || !email || !password) {
    c.status(400);
    return c.json({ error: "All fields are required" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users(username, email, password) VALUES($1,$2,$3) RETURNING id, username",
      [username, email, hash]
    );

    const token = jwt.sign(
      { id: result.rows[0].id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    return c.json({
      token,
      username: result.rows[0].username,
    });
  } catch (err: any) {
    if (err.code === "23505") {
      // unique violation
      c.status(409);
      return c.json({ error: "Username or email already exists" });
    }

    c.status(500);
    return c.json({ error: "Something went wrong" });
  }
});

/**
 * SIGNIN
 */
user.post("/signin", async (c) => {
  const { email, password } = await c.req.json();

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  const userData = result.rows[0];

  const isValid = await bcrypt.compare(password, userData.password);

  if (!isValid) {
    c.status(403);
    return c.json({ error: "Wrong password" });
  }

  const token = jwt.sign(
    { id: userData.id },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );

  return c.json({
    token,
    username: userData.username,
  });
});

export default user;

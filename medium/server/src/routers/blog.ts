import { Hono } from "hono";
import { pool } from "../db";
import { auth } from "../middleware";

const blog = new Hono();

/**
 * CREATE POST
 */
blog.post("/", auth, async (c) => {
  const userId = c.get("userId");
  const { title, content } = await c.req.json();

  const result = await pool.query(
    `INSERT INTO posts(title, content, author_id)
     VALUES($1,$2,$3)
     RETURNING *`,
    [title, content, userId]
  );

  return c.json(result.rows[0]);
});

/**
 * UPDATE POST
 */
blog.put("/", auth, async (c) => {
  const userId = c.get("userId");
  const { id, title, content } = await c.req.json();

  await pool.query(
    `UPDATE posts
     SET title=$1, content=$2, updated_at=CURRENT_TIMESTAMP
     WHERE id=$3 AND author_id=$4`,
    [title, content, id, userId]
  );

  return c.json({ message: "Post updated" });
});

/**
 * GET SINGLE POST WITH USERNAME
 */
blog.get("/:id", async (c) => {
  const id = c.req.param("id");

  const result = await pool.query(
    `SELECT posts.*, users.username
     FROM posts
     JOIN users ON posts.author_id = users.id
     WHERE posts.id=$1`,
    [id]
  );

  if (result.rows.length === 0) {
    c.status(404);
    return c.json({ error: "Post not found" });
  }

  return c.json(result.rows[0]);
});

/**
 * GET ALL POSTS WITH USERNAME
 */
blog.get("/bulk/all", async (c) => {
  const result = await pool.query(
    `SELECT posts.*, users.username
     FROM posts
     JOIN users ON posts.author_id = users.id
     ORDER BY posts.created_at DESC`
  );

  return c.json(result.rows);
});

export default blog;

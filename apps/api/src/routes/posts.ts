import { Hono } from "hono";
import { eq, desc, sql } from "drizzle-orm";
import { createDb, type Env } from "../db";
import { posts } from "../db/schema";

const postsRoute = new Hono<{ Bindings: Env }>();

// GET / - List all posts with optional limit/offset
postsRoute.get("/", async (c) => {
  try {
    const db = createDb(c.env);
    const limit = Number(c.req.query("limit") ?? "50");
    const offset = Number(c.req.query("offset") ?? "0");

    if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
      return c.json({ error: "Invalid limit or offset" }, 400);
    }

    const results = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    return c.json({ posts: results, count: results.length });
  } catch (error) {
    console.error("Error listing posts:", error);
    return c.json({ error: "Failed to list posts" }, 500);
  }
});

// GET /:id - Get a single post
postsRoute.get("/:id", async (c) => {
  try {
    const db = createDb(c.env);
    const id = Number(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "Invalid post ID" }, 400);
    }

    const result = await db.select().from(posts).where(eq(posts.id, id)).get();

    if (!result) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(result);
  } catch (error) {
    console.error("Error getting post:", error);
    return c.json({ error: "Failed to get post" }, 500);
  }
});

// POST / - Create a new post
postsRoute.post("/", async (c) => {
  try {
    const db = createDb(c.env);
    const body = await c.req.json<{
      title: string;
      content: string;
      author?: string;
    }>();

    if (!body.title || typeof body.title !== "string" || body.title.trim() === "") {
      return c.json({ error: "Title is required" }, 400);
    }

    if (!body.content || typeof body.content !== "string" || body.content.trim() === "") {
      return c.json({ error: "Content is required" }, 400);
    }

    const result = await db
      .insert(posts)
      .values({
        title: body.title.trim(),
        content: body.content.trim(),
        author: body.author?.trim() || "Anonymous",
        updatedAt: new Date(),
      })
      .returning();

    return c.json(result[0], 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

// PUT /:id - Update a post
postsRoute.put("/:id", async (c) => {
  try {
    const db = createDb(c.env);
    const id = Number(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "Invalid post ID" }, 400);
    }

    const body = await c.req.json<{
      title?: string;
      content?: string;
      author?: string;
    }>();

    // Check if post exists
    const existing = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .get();

    if (!existing) {
      return c.json({ error: "Post not found" }, 404);
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) {
      if (typeof body.title !== "string" || body.title.trim() === "") {
        return c.json({ error: "Title cannot be empty" }, 400);
      }
      updates.title = body.title.trim();
    }

    if (body.content !== undefined) {
      if (typeof body.content !== "string" || body.content.trim() === "") {
        return c.json({ error: "Content cannot be empty" }, 400);
      }
      updates.content = body.content.trim();
    }

    if (body.author !== undefined) {
      updates.author = body.author.trim() || "Anonymous";
    }

    const result = await db
      .update(posts)
      .set(updates)
      .where(eq(posts.id, id))
      .returning();

    return c.json(result[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    return c.json({ error: "Failed to update post" }, 500);
  }
});

// DELETE /:id - Delete a post
postsRoute.delete("/:id", async (c) => {
  try {
    const db = createDb(c.env);
    const id = Number(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ error: "Invalid post ID" }, 400);
    }

    // Check if post exists
    const existing = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .get();

    if (!existing) {
      return c.json({ error: "Post not found" }, 404);
    }

    await db.delete(posts).where(eq(posts.id, id));

    return c.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return c.json({ error: "Failed to delete post" }, 500);
  }
});

export default postsRoute;

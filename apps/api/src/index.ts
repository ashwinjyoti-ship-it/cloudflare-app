import { Hono } from "hono";
import { cors } from "hono/cors";
import postsRoute from "./routes/posts";
import type { Env } from "./db";

const app = new Hono<{ Bindings: Env }>();

// CORS middleware - allow all origins for this starter
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

// Health check route
app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

// Mount posts routes at /api/posts
app.route("/api/posts", postsRoute);

// Default 404 handler
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

export default app;

-- Migration: Create posts table
CREATE TABLE IF NOT EXISTS "posts" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "author" TEXT NOT NULL DEFAULT 'Anonymous',
  "created_at" INTEGER NOT NULL DEFAULT (unixepoch()),
  "updated_at" INTEGER NOT NULL DEFAULT (unixepoch())
);

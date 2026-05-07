import { Router } from "express";
import { db } from "@workspace/db";
import { commentsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/memories/:id/comments", async (req, res) => {
  try {
    const memoryId = parseInt(req.params.id);
    const comments = await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.memoryId, memoryId))
      .orderBy(asc(commentsTable.createdAt));
    res.json(comments);
  } catch (err) {
    req.log.error({ err }, "Failed to list comments");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/memories/:id/comments", async (req, res) => {
  try {
    const memoryId = parseInt(req.params.id);
    const { author, text } = req.body;
    const inserted = await db
      .insert(commentsTable)
      .values({ memoryId, author, text })
      .returning();
    res.status(201).json(inserted[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to add comment");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

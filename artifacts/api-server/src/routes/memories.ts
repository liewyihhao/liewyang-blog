import { Router } from "express";
import { db } from "@workspace/db";
import { memoriesTable, commentsTable } from "@workspace/db";
import { eq, desc, count, sql } from "drizzle-orm";

const router = Router();

router.get("/memories", async (req, res) => {
  try {
    const type = req.query.type as string | undefined;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;

    let query = db.select().from(memoriesTable).orderBy(desc(memoriesTable.createdAt));
    let countQuery = db.select({ count: count() }).from(memoriesTable);

    const memories = await (type
      ? db.select().from(memoriesTable).where(eq(memoriesTable.type, type)).orderBy(desc(memoriesTable.createdAt)).limit(limit).offset(offset)
      : db.select().from(memoriesTable).orderBy(desc(memoriesTable.createdAt)).limit(limit).offset(offset));

    const commentCounts = await db
      .select({ memoryId: commentsTable.memoryId, count: count() })
      .from(commentsTable)
      .groupBy(commentsTable.memoryId);

    const commentMap = new Map(commentCounts.map((c) => [c.memoryId, c.count]));

    const totalResult = type
      ? await db.select({ count: count() }).from(memoriesTable).where(eq(memoriesTable.type, type))
      : await countQuery;

    res.json({
      memories: memories.map((m) => ({
        ...m,
        commentCount: commentMap.get(m.id) ?? 0,
      })),
      total: totalResult[0].count,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list memories");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/memories", async (req, res) => {
  try {
    const { type, mediaUrl, caption } = req.body;
    const inserted = await db
      .insert(memoriesTable)
      .values({ type, mediaUrl, caption })
      .returning();
    res.status(201).json({ ...inserted[0], commentCount: 0 });
  } catch (err) {
    req.log.error({ err }, "Failed to create memory");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/memories/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const memory = await db.select().from(memoriesTable).where(eq(memoriesTable.id, id)).limit(1);
    if (!memory.length) return res.status(404).json({ error: "Not found" });
    const commentCnt = await db.select({ count: count() }).from(commentsTable).where(eq(commentsTable.memoryId, id));
    res.json({ ...memory[0], commentCount: commentCnt[0].count });
  } catch (err) {
    req.log.error({ err }, "Failed to get memory");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/memories/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { caption } = req.body;
    const updated = await db
      .update(memoriesTable)
      .set({ caption })
      .where(eq(memoriesTable.id, id))
      .returning();
    if (!updated.length) return res.status(404).json({ error: "Not found" });
    const commentCnt = await db.select({ count: count() }).from(commentsTable).where(eq(commentsTable.memoryId, id));
    res.json({ ...updated[0], commentCount: commentCnt[0].count });
  } catch (err) {
    req.log.error({ err }, "Failed to update memory");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/memories/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(commentsTable).where(eq(commentsTable.memoryId, id));
    await db.delete(memoriesTable).where(eq(memoriesTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete memory");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/memories/:id/like", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await db
      .update(memoriesTable)
      .set({ likes: sql`${memoriesTable.likes} + 1` })
      .where(eq(memoriesTable.id, id))
      .returning();
    if (!updated.length) return res.status(404).json({ error: "Not found" });
    const commentCnt = await db.select({ count: count() }).from(commentsTable).where(eq(commentsTable.memoryId, id));
    res.json({ ...updated[0], commentCount: commentCnt[0].count });
  } catch (err) {
    req.log.error({ err }, "Failed to like memory");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

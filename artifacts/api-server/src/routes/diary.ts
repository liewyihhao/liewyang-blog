import { Router } from "express";
import { db } from "@workspace/db";
import { diaryEntriesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/diary", async (req, res) => {
  try {
    const entries = await db
      .select()
      .from(diaryEntriesTable)
      .orderBy(desc(diaryEntriesTable.date));
    res.json(entries);
  } catch (err) {
    req.log.error({ err }, "Failed to list diary entries");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/diary", async (req, res) => {
  try {
    const { date, title, message, images } = req.body;
    const inserted = await db
      .insert(diaryEntriesTable)
      .values({ date, title, message, images: images ?? [] })
      .returning();
    res.status(201).json(inserted[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create diary entry");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/diary/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const entry = await db
      .select()
      .from(diaryEntriesTable)
      .where(eq(diaryEntriesTable.id, id))
      .limit(1);
    if (!entry.length) return res.status(404).json({ error: "Not found" });
    res.json(entry[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to get diary entry");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/diary/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { date, title, message, images } = req.body;
    const updated = await db
      .update(diaryEntriesTable)
      .set({ date, title, message, images: images ?? [] })
      .where(eq(diaryEntriesTable.id, id))
      .returning();
    if (!updated.length) return res.status(404).json({ error: "Not found" });
    res.json(updated[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update diary entry");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/diary/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(diaryEntriesTable).where(eq(diaryEntriesTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete diary entry");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

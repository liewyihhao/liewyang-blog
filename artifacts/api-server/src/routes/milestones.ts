import { Router } from "express";
import { db } from "@workspace/db";
import { milestonesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/milestones", async (req, res) => {
  try {
    const milestones = await db
      .select()
      .from(milestonesTable)
      .orderBy(asc(milestonesTable.order));
    res.json(milestones);
  } catch (err) {
    req.log.error({ err }, "Failed to list milestones");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/milestones", async (req, res) => {
  try {
    const { title, date, icon, imageUrl, note, order } = req.body;
    const inserted = await db
      .insert(milestonesTable)
      .values({ title, date, icon, imageUrl, note, order: order ?? 0 })
      .returning();
    res.status(201).json(inserted[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create milestone");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/milestones/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, date, icon, imageUrl, note, order } = req.body;
    const updated = await db
      .update(milestonesTable)
      .set({ title, date, icon, imageUrl, note, order })
      .where(eq(milestonesTable.id, id))
      .returning();
    if (!updated.length) { res.status(404).json({ error: "Not found" }); return; }
    res.json(updated[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update milestone");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/milestones/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(milestonesTable).where(eq(milestonesTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete milestone");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

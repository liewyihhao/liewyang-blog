import { Router } from "express";
import { db } from "@workspace/db";
import { profileTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/profile", async (req, res) => {
  try {
    let profiles = await db.select().from(profileTable).limit(1);
    if (profiles.length === 0) {
      const inserted = await db
        .insert(profileTable)
        .values({
          childName: "Liew Yang",
          tagline: "The journey of our little star",
        })
        .returning();
      return res.json(inserted[0]);
    }
    res.json(profiles[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to get profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    let profiles = await db.select().from(profileTable).limit(1);
    const { childName, tagline, photoUrl, birthDate } = req.body;
    if (profiles.length === 0) {
      const inserted = await db
        .insert(profileTable)
        .values({ childName, tagline, photoUrl, birthDate })
        .returning();
      return res.json(inserted[0]);
    }
    const updated = await db
      .update(profileTable)
      .set({ childName, tagline, photoUrl, birthDate })
      .where(eq(profileTable.id, profiles[0].id))
      .returning();
    res.json(updated[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update profile");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

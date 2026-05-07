import { Router } from "express";
import { db } from "@workspace/db";
import { memoriesTable, diaryEntriesTable, milestonesTable, commentsTable } from "@workspace/db";
import { count, sum, eq, desc } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const [totalMemoriesResult] = await db.select({ count: count() }).from(memoriesTable);
    const [totalPhotosResult] = await db.select({ count: count() }).from(memoriesTable).where(eq(memoriesTable.type, "photo"));
    const [totalVideosResult] = await db.select({ count: count() }).from(memoriesTable).where(eq(memoriesTable.type, "video"));
    const [totalDiaryResult] = await db.select({ count: count() }).from(diaryEntriesTable);
    const [totalMilestonesResult] = await db.select({ count: count() }).from(milestonesTable);
    const [totalLikesResult] = await db.select({ total: sum(memoriesTable.likes) }).from(memoriesTable);

    res.json({
      totalMemories: totalMemoriesResult.count,
      totalPhotos: totalPhotosResult.count,
      totalVideos: totalVideosResult.count,
      totalDiaryEntries: totalDiaryResult.count,
      totalMilestones: totalMilestonesResult.count,
      totalLikes: parseInt(totalLikesResult.total ?? "0"),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/recent", async (req, res) => {
  try {
    const recentMemories = await db
      .select()
      .from(memoriesTable)
      .orderBy(desc(memoriesTable.createdAt))
      .limit(6);

    const commentCounts = await db
      .select({ memoryId: commentsTable.memoryId, cnt: count() })
      .from(commentsTable)
      .groupBy(commentsTable.memoryId);
    const commentMap = new Map(commentCounts.map((c) => [c.memoryId, c.cnt]));

    const recentDiaryEntries = await db
      .select()
      .from(diaryEntriesTable)
      .orderBy(desc(diaryEntriesTable.date))
      .limit(3);

    res.json({
      recentMemories: recentMemories.map((m) => ({
        ...m,
        commentCount: commentMap.get(m.id) ?? 0,
      })),
      recentDiaryEntries,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get recent activity");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

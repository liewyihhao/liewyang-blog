import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const diaryEntriesTable = pgTable("diary_entries", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  images: text("images").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertDiaryEntrySchema = createInsertSchema(diaryEntriesTable).omit({ id: true, createdAt: true });
export type InsertDiaryEntry = z.infer<typeof insertDiaryEntrySchema>;
export type DiaryEntry = typeof diaryEntriesTable.$inferSelect;

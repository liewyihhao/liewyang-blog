import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const milestonesTable = pgTable("milestones", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  icon: text("icon").notNull(),
  imageUrl: text("image_url"),
  note: text("note"),
  order: integer("order").notNull().default(0),
});

export const insertMilestoneSchema = createInsertSchema(milestonesTable).omit({ id: true });
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type Milestone = typeof milestonesTable.$inferSelect;

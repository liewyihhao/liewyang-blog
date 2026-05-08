import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profileTable = pgTable("profile", {
  id: serial("id").primaryKey(),
  childName: text("child_name").notNull().default("Liew Yang"),
  tagline: text("tagline").notNull().default("The journey of our little star"),
  photoUrl: text("photo_url"),
  birthDate: text("birth_date"),
});

export const insertProfileSchema = createInsertSchema(profileTable).omit({ id: true });
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profileTable.$inferSelect;

import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const petsTable = pgTable("pets", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    species: varchar({ length: 100 }).notNull(),
    breed: varchar({ length: 100 }),
    age: integer(),
    weight: integer(),
    ownerName: varchar({ length: 255 }).notNull(),
    ownerPhone: varchar({ length: 20 }).notNull(),
    medicalHistory: text(),
    createdAt: timestamp().defaultNow().notNull(),
}); 
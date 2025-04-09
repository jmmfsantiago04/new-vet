import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Database Schema
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 20 }).default('user').notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const sessionsTable = pgTable("sessions", {
    id: varchar({ length: 255 }).primaryKey(),
    userId: integer().notNull().references(() => usersTable.id),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
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

// Zod Validations
export const selectPetSchema = createSelectSchema(petsTable, {
    name: (schema) => schema.min(2, 'Name must be at least 2 characters').max(255, 'Name is too long'),
    ownerPhone: (schema) => schema.regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +1234567890)'),
});

export const insertPetSchema = createInsertSchema(petsTable, {
    name: (schema) => schema.min(2, 'Name must be at least 2 characters').max(255, 'Name is too long'),
    species: (schema) => schema.min(2, 'Species must be at least 2 characters').max(100, 'Species name is too long'),
    breed: (schema) => schema.nullable().optional(),
    age: (schema) => schema.nullable().optional().refine((val) => !val || (val > 0 && val < 50), {
        message: "Age must be between 0 and 50 years"
    }),
    weight: (schema) => schema.nullable().optional().refine((val) => !val || (val > 0 && val < 200), {
        message: "Weight must be between 0 and 200 kg"
    }),
    ownerName: (schema) => schema.min(2, 'Owner name must be at least 2 characters').max(255, 'Owner name is too long'),
    ownerPhone: (schema) => schema.regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +1234567890)'),
    medicalHistory: (schema) => schema.nullable().optional(),
});

// Auth Schemas
export const signUpSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(255, 'Nome muito longo'),
    email: z.string().email('Por favor, insira um e-mail válido'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export const signInSchema = z.object({
    email: z.string().email('Por favor, insira um e-mail válido'),
    password: z.string().min(1, 'Senha é obrigatória'),
});

// Types
export type InsertPet = z.infer<typeof insertPetSchema>;
export type SelectPet = z.infer<typeof selectPetSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type Session = typeof sessionsTable.$inferSelect;
export type InsertSession = typeof sessionsTable.$inferInsert; 
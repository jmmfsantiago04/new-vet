import { integer, pgTable, varchar, text, timestamp, date, time, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations, sql } from 'drizzle-orm';

// Define role type
export const UserRole = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

// Database Schema
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    phone: varchar({ length: 20 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 20 }).default(UserRole.USER).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const petsTable = pgTable("pets", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    species: varchar({ length: 100 }).notNull(),
    breed: varchar({ length: 100 }),
    age: integer(),
    weight: integer(),
    userId: integer().notNull().references(() => usersTable.id),
    medicalHistory: text(),
    createdAt: timestamp().defaultNow().notNull(),
});

export const appointmentsTable = pgTable('appointments', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => usersTable.id),
    petId: integer('pet_id').notNull().references(() => petsTable.id),
    date: date('date').notNull(),
    time: time('time').notNull(),
    status: text('status').notNull().default('pending'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// FAQ Schema
export const faqCategoriesTable = pgTable('faq_categories', {
    id: serial('id').primaryKey(),
    category: varchar({ length: 255 }).notNull(),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const faqItemsTable = pgTable('faq_items', {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id').notNull().references(() => faqCategoriesTable.id),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    order: integer('order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
    pets: many(petsTable),
    appointments: many(appointmentsTable),
}));

export const petsRelations = relations(petsTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [petsTable.userId],
        references: [usersTable.id],
    }),
    appointments: many(appointmentsTable),
}));

export const appointmentsRelations = relations(appointmentsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [appointmentsTable.userId],
        references: [usersTable.id],
    }),
    pet: one(petsTable, {
        fields: [appointmentsTable.petId],
        references: [petsTable.id],
    }),
}));

// FAQ Relations
export const faqCategoriesRelations = relations(faqCategoriesTable, ({ many }) => ({
    items: many(faqItemsTable),
}));

export const faqItemsRelations = relations(faqItemsTable, ({ one }) => ({
    category: one(faqCategoriesTable, {
        fields: [faqItemsTable.categoryId],
        references: [faqCategoriesTable.id],
    }),
}));

// Zod Validations
export const selectPetSchema = createSelectSchema(petsTable, {
    name: (schema) => schema.min(2, 'Name must be at least 2 characters').max(255, 'Name is too long'),
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
    medicalHistory: (schema) => schema.nullable().optional(),
});

export const appointmentSchema = z.object({
    petId: z.string({
        required_error: "Por favor, selecione um pet",
    }),
    date: z.date({
        required_error: "Por favor, selecione uma data",
    }),
    time: z.string({
        required_error: "Por favor, selecione um horário",
    }).regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "Horário inválido. Use o formato HH:MM",
    }),
});

// Auth Schemas
export const signUpSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(255, 'Nome muito longo'),
    email: z.string().email('Por favor, insira um e-mail válido'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Por favor, insira um telefone válido (ex: +5571999999999)'),
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

// FAQ Zod Schemas
export const insertFaqCategorySchema = createInsertSchema(faqCategoriesTable, {
    category: (schema) => schema.min(2, 'Category must be at least 2 characters').max(255, 'Category name is too long'),
    order: (schema) => schema.optional(),
});

export const insertFaqItemSchema = createInsertSchema(faqItemsTable, {
    question: (schema) => schema.min(10, 'Question must be at least 10 characters'),
    answer: (schema) => schema.min(10, 'Answer must be at least 10 characters'),
    order: (schema) => schema.optional(),
    isActive: (schema) => schema.optional(),
});

export const selectFaqCategorySchema = createSelectSchema(faqCategoriesTable);
export const selectFaqItemSchema = createSelectSchema(faqItemsTable);

// Types
export type InsertPet = z.infer<typeof insertPetSchema>;
export type SelectPet = z.infer<typeof selectPetSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type InsertFaqCategory = z.infer<typeof insertFaqCategorySchema>;
export type InsertFaqItem = z.infer<typeof insertFaqItemSchema>;
export type SelectFaqCategory = z.infer<typeof selectFaqCategorySchema>;
export type SelectFaqItem = z.infer<typeof selectFaqItemSchema>; 
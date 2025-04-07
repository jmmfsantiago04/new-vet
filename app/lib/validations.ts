import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { petsTable } from '@/app/db/schema';
import { z } from 'zod';

// Schema for selecting pets (used for API responses)
export const selectPetSchema = createSelectSchema(petsTable, {
    // Add custom validations or transformations here
    name: (schema) => schema.min(2, 'Name must be at least 2 characters').max(255, 'Name is too long'),
    ownerPhone: (schema) => schema.regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +1234567890)'),
});

// Schema for inserting pets (used for form validation)
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

// Type for the validated pet data
export type InsertPet = z.infer<typeof insertPetSchema>;
export type SelectPet = z.infer<typeof selectPetSchema>; 
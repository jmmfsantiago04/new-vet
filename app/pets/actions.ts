'use server'

import { db } from '@/app/db';
import { petsTable, insertPetSchema } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

export async function addPet(formData: FormData) {
    const pet = {
        name: formData.get('name'),
        species: formData.get('species'),
        breed: formData.get('breed'),
        age: Number(formData.get('age')) || null,
        weight: Number(formData.get('weight')) || null,
        ownerName: formData.get('ownerName'),
        ownerPhone: formData.get('ownerPhone'),
        medicalHistory: formData.get('medicalHistory'),
    };

    try {
        // Validate the data
        const validatedPet = insertPetSchema.parse(pet);

        // Insert into database
        await db.insert(petsTable).values(validatedPet);
        revalidatePath('/pets');
        return { success: true };
    } catch (error) {
        if (error instanceof ZodError) {
            // Format the first validation error in a user-friendly way
            const firstError = error.errors[0];
            return {
                error: `${firstError.path.join('.')}: ${firstError.message}`
            };
        }
        return { error: 'Something went wrong' };
    }
}

export async function deletePet(formData: FormData) {
    const id = Number(formData.get('id'));
    try {
        await db.delete(petsTable).where(eq(petsTable.id, id));
        revalidatePath('/pets');
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Something went wrong' };
    }
} 
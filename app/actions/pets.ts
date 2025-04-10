'use server'

import { db } from '@/app/db';
import { petsTable, insertPetSchema } from '@/app/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getSession } from "@/app/lib/session";

export async function addPet(formData: FormData) {
    try {
        const session = await getSession();
        if (!session) {
            return { error: "Você precisa estar logado para adicionar um pet" };
        }

        const pet = {
            name: formData.get('name') as string,
            species: formData.get('species') as string,
            breed: formData.get('breed') as string || null,
            age: formData.get('age') ? parseInt(formData.get('age') as string) : null,
            weight: formData.get('weight') ? parseInt(formData.get('weight') as string) : null,
            medicalHistory: formData.get('medicalHistory') as string || null,
            userId: session.id,
        };

        // Validate the data before attempting to insert
        const validatedPet = insertPetSchema.parse(pet);

        // Try to insert with retries
        let retries = 3;
        let lastError;

        while (retries > 0) {
            try {
                await db.insert(petsTable).values(validatedPet);
                revalidatePath('/cliente/dashboard');
                return { success: true };
            } catch (error) {
                lastError = error;
                retries--;
                if (retries > 0) {
                    // Wait for a short time before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }

        console.error('Error adding pet after retries:', lastError);
        return { error: "Erro ao adicionar pet. Por favor, tente novamente." };
    } catch (error) {
        console.error('Error adding pet:', error);
        if (error instanceof ZodError) {
            return { error: "Dados inválidos. Por favor, verifique as informações." };
        }
        return { error: "Erro ao adicionar pet. Por favor, tente novamente." };
    }
}

interface UpdatePetData {
    id: number;
    name?: string;
    species?: string;
    breed?: string | null;
    age?: number | null;
    weight?: number | null;
    medicalHistory?: string | null;
}

export async function updatePet(data: UpdatePetData) {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("Não autorizado");
        }

        await db.update(petsTable)
            .set({
                name: data.name,
                species: data.species,
                breed: data.breed,
                age: data.age,
                weight: data.weight,
                medicalHistory: data.medicalHistory,
            })
            .where(eq(petsTable.id, data.id));

        revalidatePath("/admin/pets");
        revalidatePath("/cliente/pets");
        return { success: true };
    } catch (error) {
        console.error("Error updating pet:", error);
        throw new Error("Erro ao atualizar pet");
    }
}

export async function deletePet(id: number) {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("Não autorizado");
        }

        await db.delete(petsTable)
            .where(eq(petsTable.id, id));

        revalidatePath("/admin/pets");
        revalidatePath("/cliente/pets");
        return { success: true };
    } catch (error) {
        console.error("Error deleting pet:", error);
        throw new Error("Erro ao excluir pet");
    }
} 
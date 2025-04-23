'use server'

import { db } from '@/app/db';
import { petsTable, insertPetSchema } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type SessionUser = {
    id: string;
    role?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
};

type Session = {
    user?: SessionUser;
    expires: string;
};

export async function addPet(formData: FormData) {
    try {
        console.log('Starting addPet function...');

        const session = await getServerSession(authOptions) as Session | null;
        console.log('Session data:', session);

        if (!session?.user?.id) {
            console.log('No session found, returning error');
            return { error: "Você precisa estar logado para adicionar um pet" };
        }

        // Log form data
        console.log('Form data received:', {
            name: formData.get('name'),
            species: formData.get('species'),
            breed: formData.get('breed'),
            age: formData.get('age'),
            weight: formData.get('weight'),
            medicalHistory: formData.get('medicalHistory'),
        });

        const pet = {
            name: formData.get('name') as string,
            species: formData.get('species') as string,
            breed: formData.get('breed') as string || null,
            age: formData.get('age') ? parseInt(formData.get('age') as string) : null,
            weight: formData.get('weight') ? parseInt(formData.get('weight') as string) : null,
            medicalHistory: formData.get('medicalHistory') as string || null,
            userId: parseInt(session.user.id),
        };

        console.log('Constructed pet object:', pet);

        // Validate the data before attempting to insert
        console.log('Attempting to validate pet data...');
        const validatedPet = insertPetSchema.parse(pet);
        console.log('Pet data validated successfully:', validatedPet);

        // Try to insert with retries
        let retries = 3;
        let lastError;

        while (retries > 0) {
            try {
                console.log(`Attempting to insert pet (${4 - retries} attempt)...`);
                await db.insert(petsTable).values(validatedPet);
                console.log('Pet inserted successfully!');
                revalidatePath('/cliente/dashboard');
                return { success: true };
            } catch (error) {
                lastError = error;
                console.error(`Failed insert attempt (${4 - retries}):`, error);
                retries--;
                if (retries > 0) {
                    console.log(`Retrying in 1 second... (${retries} attempts remaining)`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }

        console.error('All insert attempts failed. Last error:', lastError);
        return { error: "Erro ao adicionar pet. Por favor, tente novamente." };
    } catch (error) {
        console.error('Caught error in addPet:', error);
        if (error instanceof ZodError) {
            console.log('Validation error details:', error.errors);
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
        const session = await getServerSession(authOptions);
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
        const session = await getServerSession(authOptions);
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
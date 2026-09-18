"use server";

import { db } from "@/app/db";
import { petsTable, insertPetSchema } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

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
        const session = (await getServerSession(authOptions)) as Session | null;

        if (!session?.user?.id) {
            return { error: "Você precisa estar logado para adicionar um pet" };
        }

        const pet = {
            name: formData.get("name") as string,
            species: formData.get("species") as string,
            breed: (formData.get("breed") as string) || null,
            age: formData.get("age")
                ? parseInt(formData.get("age") as string)
                : null,
            weight: formData.get("weight")
                ? parseInt(formData.get("weight") as string)
                : null,
            medicalHistory: (formData.get("medicalHistory") as string) || null,
            userId: parseInt(session.user.id),
        };

        const validatedPet = insertPetSchema.parse(pet);

        await db.insert(petsTable).values(validatedPet);
        revalidatePath("/cliente/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Caught error in addPet:", error);
        if (error instanceof ZodError) {
            return {
                error: "Dados inválidos. Por favor, verifique as informações.",
            };
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

async function assertCanManagePet(petId: number, session: Session) {
    if (!session.user?.id) {
        throw new Error("Não autorizado");
    }

    const pet = await db.query.petsTable.findFirst({
        where: eq(petsTable.id, petId),
    });

    if (!pet) {
        throw new Error("Pet não encontrado");
    }

    const isAdmin = session.user.role === "admin";
    const isOwner = pet.userId === Number(session.user.id);

    if (!isAdmin && !isOwner) {
        throw new Error("Não autorizado");
    }

    return pet;
}

export async function updatePet(data: UpdatePetData) {
    try {
        const session = (await getServerSession(authOptions)) as Session | null;
        if (!session?.user?.id) {
            throw new Error("Não autorizado");
        }

        await assertCanManagePet(data.id, session);

        await db
            .update(petsTable)
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
        revalidatePath("/cliente/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error updating pet:", error);
        throw new Error(
            error instanceof Error ? error.message : "Erro ao atualizar pet",
        );
    }
}

export async function deletePet(id: number) {
    try {
        const session = (await getServerSession(authOptions)) as Session | null;
        if (!session?.user?.id) {
            throw new Error("Não autorizado");
        }

        await assertCanManagePet(id, session);

        await db.delete(petsTable).where(eq(petsTable.id, id));

        revalidatePath("/admin/pets");
        revalidatePath("/cliente/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error deleting pet:", error);
        throw new Error(
            error instanceof Error ? error.message : "Erro ao excluir pet",
        );
    }
}

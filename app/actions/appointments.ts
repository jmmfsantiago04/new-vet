"use server";

import { db } from "@/app/db";
import { appointmentsTable, petsTable } from "@/app/db/schema";
import { and, eq } from "drizzle-orm";
import type { AppointmentSchema } from "@/app/lib/validations/appointment";
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

export async function createAppointment(data: AppointmentSchema) {
    try {
        const session = (await getServerSession(authOptions)) as Session | null;
        if (!session?.user?.id) {
            return {
                error: "Você precisa estar logado para agendar uma consulta.",
            };
        }

        const petId = parseInt(data.petId);
        const pet = await db.query.petsTable.findFirst({
            where: eq(petsTable.id, petId),
        });

        if (!pet || pet.userId !== Number(session.user.id)) {
            return { error: "Pet inválido." };
        }

        const formattedDate = data.date.toISOString().split("T")[0];

        const existingAppointment = await db
            .select()
            .from(appointmentsTable)
            .where(
                and(
                    eq(appointmentsTable.date, formattedDate),
                    eq(appointmentsTable.time, data.time),
                ),
            )
            .limit(1);

        if (existingAppointment.length > 0) {
            return {
                error: "Este horário já está ocupado. Por favor, escolha outro horário.",
            };
        }

        await db.insert(appointmentsTable).values({
            petId,
            date: formattedDate,
            time: data.time,
            userId: parseInt(session.user.id),
            status: "pending",
        });

        return { success: "Consulta agendada com sucesso!" };
    } catch (error) {
        console.error("Error creating appointment:", error);
        return {
            error: "Erro ao agendar consulta. Por favor, tente novamente.",
        };
    }
}

export async function updateAppointmentStatus(id: number, status: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "admin") {
            throw new Error("Não autorizado");
        }

        await db
            .update(appointmentsTable)
            .set({ status })
            .where(eq(appointmentsTable.id, id));

        return { success: true };
    } catch (error) {
        console.error("Error updating appointment status:", error);
        throw new Error("Erro ao atualizar status da consulta");
    }
}

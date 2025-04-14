'use server';

import { db } from '@/app/db';
import { appointmentsTable } from '@/app/db/schema';
import { getSession } from '@/app/lib/session';
import { and, eq } from 'drizzle-orm';
import type { AppointmentSchema } from '@/app/lib/validations/appointment';

export async function createAppointment(data: AppointmentSchema) {
    try {
        const session = await getSession();
        if (!session) {
            return { error: 'Você precisa estar logado para agendar uma consulta.' };
        }

        const formattedDate = data.date.toISOString().split('T')[0];

        // Use a transaction to handle concurrent bookings
        return await db.transaction(async (tx) => {
            // Check if user already has an appointment at the same date and time
            const existingAppointment = await tx
                .select()
                .from(appointmentsTable)
                .where(
                    and(
                        eq(appointmentsTable.date, formattedDate),
                        eq(appointmentsTable.time, data.time)
                    )
                )
                .limit(1);

            if (existingAppointment.length > 0) {
                return { error: 'Este horário já está ocupado. Por favor, escolha outro horário.' };
            }

            // Create the appointment within the same transaction
            await tx.insert(appointmentsTable).values({
                petId: parseInt(data.petId),
                date: formattedDate,
                time: data.time,
                userId: session.id,
                status: 'pending',
            });

            return { success: 'Consulta agendada com sucesso!' };
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return { error: 'Erro ao agendar consulta. Por favor, tente novamente.' };
    }
}

export async function updateAppointmentStatus(id: number, status: string) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'admin') {
            throw new Error('Não autorizado');
        }

        await db.update(appointmentsTable)
            .set({ status })
            .where(eq(appointmentsTable.id, id));

        return { success: true };
    } catch (error) {
        console.error('Error updating appointment status:', error);
        throw new Error('Erro ao atualizar status da consulta');
    }
} 
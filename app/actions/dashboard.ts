'use server';

import { db } from '@/app/db';
import { eq } from 'drizzle-orm';
import { petsTable, appointmentsTable } from '@/app/db/schema';

export async function getDashboardData(userId: string) {
    try {
        // Fetch user's pets
        const userPets = await db.query.petsTable.findMany({
            where: eq(petsTable.userId, userId),
            orderBy: (pets, { desc }) => [desc(pets.createdAt)],
        });

        // Fetch user's appointments
        const userAppointments = await db.query.appointmentsTable.findMany({
            where: eq(appointmentsTable.userId, userId),
            orderBy: (appointments, { desc }) => [desc(appointments.date), desc(appointments.time)],
            with: {
                pet: true
            }
        });

        return {
            userPets,
            userAppointments,
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return {
            userPets: [],
            userAppointments: [],
        };
    }
} 
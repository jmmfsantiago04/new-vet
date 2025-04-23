'use server';

import { db } from '@/app/db';
import { eq } from 'drizzle-orm';
import { petsTable, appointmentsTable } from '@/app/db/schema';

export async function getDashboardData(userId: string) {
    try {
        // Convert userId from string to number
        const userIdNumber = parseInt(userId, 10);

        // Fetch user's pets
        const userPets = await db.query.petsTable.findMany({
            where: eq(petsTable.userId, userIdNumber),
            orderBy: (pets, { desc }) => [desc(pets.createdAt)],
        });

        // Fetch user's appointments
        const userAppointments = await db.query.appointmentsTable.findMany({
            where: eq(appointmentsTable.userId, userIdNumber),
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
import { db } from '@/app/db';
import { getSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { petsTable, appointmentsTable } from '@/app/db/schema';
import { DashboardContent } from '@/components/cliente/DashboardContent';

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    // Fetch only the logged-in user's pets
    const userPets = await db.query.petsTable.findMany({
        where: eq(petsTable.userId, session.id),
        orderBy: (pets, { desc }) => [desc(pets.createdAt)],
    });

    // Fetch user's appointments
    const userAppointments = await db.query.appointmentsTable.findMany({
        where: eq(appointmentsTable.userId, session.id),
        orderBy: (appointments, { desc }) => [desc(appointments.date), desc(appointments.time)],
        with: {
            pet: true
        }
    });

    return (
        <DashboardContent
            userName={session.name}
            userPets={userPets}
            userAppointments={userAppointments}
        />
    );
}
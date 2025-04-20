import { db } from '@/app/db';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { petsTable, appointmentsTable } from '@/app/db/schema';
import { DashboardContent } from '@/components/cliente/DashboardContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/login');
    }

    // Convert string id to number for the database query
    const userId = parseInt(session.user.id);

    // Fetch only the logged-in user's pets
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

    return (
        <DashboardContent
            userName={session.user.name || ''}
            userPets={userPets}
            userAppointments={userAppointments}
        />
    );
}
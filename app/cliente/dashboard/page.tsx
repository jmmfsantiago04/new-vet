import { PetForm } from '@/components/pets/pet-form';
import { PetUserTable } from '@/components/pets/pet-user-table';
import { db } from '@/app/db';
import SignOutButton from '@/components/SignOutButton';
import { getSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { petsTable } from '@/app/db/schema';
import { AppointmentUserForm } from '@/components/appointments/appointment-user-form';

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

    // Format pets for the appointment form
    const petsForAppointment = userPets.map(pet => ({
        id: pet.id,
        name: pet.name
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-[var(--primary)]">
                            Olá, {session.name}! 👋
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Gerencie seus pets e acompanhe seus atendimentos
                        </p>
                    </div>
                    <SignOutButton />
                </div>

                <div className="grid gap-8">
                    {userPets.length > 0 && (
                        <section>
                            <AppointmentUserForm pets={petsForAppointment} />
                        </section>
                    )}

                    <section>
                        <PetForm />
                    </section>

                    <section>
                        <PetUserTable pets={userPets} />
                    </section>
                </div>
            </div>
        </div>
    );
}
import { PetForm } from '@/components/pets/pet-form';
import { PetsTable } from '@/components/pets/pets-table';
import { db } from '@/app/db';
import SignOutButton from '@/components/SignOutButton';
import { getSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    // Fetch pets from the database
    const pets = await db.query.petsTable.findMany({
        orderBy: (pets, { desc }) => [desc(pets.createdAt)],
    });

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
                    <section>
                        <PetForm />
                    </section>

                    <section>
                        <PetsTable pets={pets} />
                    </section>
                </div>
            </div>
        </div>
    );
}
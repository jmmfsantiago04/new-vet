import { PetForm } from '@/components/pets/pet-form';
import { PetsTable } from '@/components/pets/pets-table';
import { fetchPets } from '@/app/lib/data';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/pets/table-skeleton';

export default async function PetsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pet Management</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Manage your veterinary clinic's pet records
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:gap-8">
                <div className="md:max-w-[800px]">
                    <PetForm />
                </div>
                <Suspense fallback={<TableSkeleton />}>
                    <PetsTableWrapper />
                </Suspense>
            </div>
        </div>
    );
}

async function PetsTableWrapper() {
    const pets = await fetchPets();
    return <PetsTable pets={pets} />;
} 
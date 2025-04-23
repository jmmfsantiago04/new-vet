import { db } from '@/app/db';
import { petsTable } from '@/app/db/schema';
import { AdminPetTable } from '@/components/admin/AdminPetTable';
import { desc } from 'drizzle-orm';

export default async function AdminPetsPage() {
    // Fetch all pets with their owners' information
    const pets = await db.query.petsTable.findMany({
        orderBy: [desc(petsTable.createdAt)],
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                }
            }
        }
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Pets</h1>
                <p className="text-muted-foreground">
                    Gerencie os pets cadastrados no sistema
                </p>
            </div>

            <AdminPetTable pets={pets} />
        </div>
    );
} 
import { db } from '@/app/db';
import { usersTable } from '@/app/db/schema';
import { AdminUserTable } from '@/components/admin/AdminUserTable';
import { desc } from 'drizzle-orm';

export default async function AdminUsersPage() {
    // Fetch all users ordered by creation date
    const users = await db.query.usersTable.findMany({
        orderBy: [desc(usersTable.createdAt)],
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
                <p className="text-muted-foreground">
                    Gerencie os usuários do sistema
                </p>
            </div>

            <AdminUserTable users={users} />
        </div>
    );
} 
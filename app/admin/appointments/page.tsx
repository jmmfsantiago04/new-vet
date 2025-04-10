import { db } from '@/app/db';
import { appointmentsTable } from '@/app/db/schema';
import { AdminAppointmentTable } from '@/components/admin/AdminAppointmentTable';
import { desc } from 'drizzle-orm';

export default async function AdminAppointmentsPage() {
    // Fetch all appointments with related pet and user information
    const appointments = await db.query.appointmentsTable.findMany({
        orderBy: [desc(appointmentsTable.date), desc(appointmentsTable.time)],
        with: {
            pet: {
                columns: {
                    id: true,
                    name: true,
                    species: true,
                }
            },
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
                <h1 className="text-3xl font-bold tracking-tight">Consultas</h1>
                <p className="text-muted-foreground">
                    Gerencie as consultas agendadas
                </p>
            </div>

            <AdminAppointmentTable appointments={appointments} />
        </div>
    );
} 
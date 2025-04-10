import { db } from '@/app/db';
import { usersTable, petsTable, appointmentsTable } from '@/app/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sql } from 'drizzle-orm';
import SignOutButton from '@/components/SignOutButton';
import { ChangePasswordDialog } from '@/components/admin/ChangePasswordDialog';

export default async function AdminDashboard() {
    // Fetch statistics
    const [userCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(usersTable);

    const [petCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(petsTable);

    const [appointmentCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(appointmentsTable);

    const [pendingAppointments] = await db
        .select({ count: sql<number>`count(*)` })
        .from(appointmentsTable)
        .where(sql`status = 'pending'`);

    const stats = [
        {
            name: 'Total de Usuários',
            value: Number(userCount.count),
            icon: '👥',
            description: 'Usuários cadastrados na plataforma',
        },
        {
            name: 'Total de Pets',
            value: Number(petCount.count),
            icon: '🐾',
            description: 'Pets registrados no sistema',
        },
        {
            name: 'Total de Consultas',
            value: Number(appointmentCount.count),
            icon: '📅',
            description: 'Consultas agendadas',
        },
        {
            name: 'Consultas Pendentes',
            value: Number(pendingAppointments.count),
            icon: '⏳',
            description: 'Consultas aguardando atendimento',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Bem-vindo ao painel administrativo do VetPay
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <ChangePasswordDialog />
                    <SignOutButton />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.name}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.name}
                            </CardTitle>
                            <span className="text-2xl">{stat.icon}</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 
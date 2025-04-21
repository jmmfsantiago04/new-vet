import { db } from '@/app/db';
import { usersTable, petsTable, appointmentsTable, faqItemsTable } from '@/app/db/schema';
import { sql } from 'drizzle-orm';
import { DashboardContent } from '@/components/admin/DashboardContent';

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

    const [faqCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(faqItemsTable);

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
        {
            name: 'Perguntas FAQ',
            value: Number(faqCount.count),
            icon: '❓',
            description: 'Perguntas frequentes cadastradas',
            href: '/admin/faq',
        },
    ];

    return <DashboardContent stats={stats} />;
} 

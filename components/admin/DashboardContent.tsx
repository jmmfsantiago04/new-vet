'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignOutButton from '@/components/auth/SignOutButton';
import { ChangePasswordDialog } from '@/components/admin/ChangePasswordDialog';
import { NumberTicker } from '@/components/magicui/number-ticker';
import Link from 'next/link';

interface Stat {
    name: string;
    value: number;
    icon: string;
    description: string;
    href?: string;
}

interface DashboardContentProps {
    stats: Stat[];
}

export function DashboardContent({ stats }: DashboardContentProps) {
    return (
        <div className="flex flex-col gap-6">
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
                {stats.map((stat, index) => (
                    <Card
                        key={stat.name}
                        className={stat.href ? 'cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg' : ''}
                    >
                        {stat.href ? (
                            <Link href={stat.href}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.name}
                                    </CardTitle>
                                    <span className="text-2xl">{stat.icon}</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        <NumberTicker
                                            value={stat.value}
                                            delay={index * 0.1}
                                            className="text-2xl font-bold text-[var(--primary)]"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Link>
                        ) : (
                            <>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.name}
                                    </CardTitle>
                                    <span className="text-2xl">{stat.icon}</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        <NumberTicker
                                            value={stat.value}
                                            delay={index * 0.1}
                                            className="text-2xl font-bold text-[var(--primary)]"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
} 
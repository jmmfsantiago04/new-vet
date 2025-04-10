'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import {
    Card,
    CardContent,
} from '@/components/ui/card';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/appointments', label: 'Consultas', icon: '📅' },
        { href: '/admin/users', label: 'Usuários', icon: '👥' },
        { href: '/admin/pets', label: 'Pets', icon: '🐾' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-[var(--primary)]">Admin</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-[var(--primary)] text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t">
                    <SignOutButton className="w-full" />
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <Card className="fixed bottom-4 left-4 right-4 md:hidden z-50">
                <CardContent className="p-2">
                    <nav className="flex justify-around">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center p-2 rounded-lg ${isActive
                                            ? 'text-[var(--primary)]'
                                            : 'text-gray-600'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-xs mt-1">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </CardContent>
            </Card>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
} 
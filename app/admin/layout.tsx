'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from '@/components/auth/SignOutButton';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarProvider,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
} from '@/components/ui/sidebar';

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
        { href: '/admin/blog', label: 'Blog', icon: '📝' },
        { href: '/admin/faq', label: 'FAQ', icon: '❓' },
    ];

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen h-screen w-full bg-gray-100">
                {/* Desktop Sidebar */}
                <Sidebar
                    className="hidden md:flex h-screen border-r bg-white shadow-sm"
                    variant="sidebar"
                    collapsible="icon"
                >
                    <SidebarHeader className="p-4 sm:p-6 border-b flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] tracking-tight">Admin</h2>
                        <SidebarTrigger className="hidden md:flex" />
                    </SidebarHeader>
                    <SidebarContent className="flex-1 px-2 sm:px-3 py-2 sm:py-4">
                        <SidebarMenu className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <Link href={item.href} passHref legacyBehavior>
                                            <SidebarMenuButton
                                                isActive={isActive}
                                                className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 ${isActive
                                                    ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                                                    }`}
                                                tooltip={item.label}
                                            >
                                                <span className="text-base sm:text-lg shrink-0">{item.icon}</span>
                                                <span className="font-medium text-sm sm:text-base truncate">{item.label}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                </Sidebar>

                {/* Mobile Navigation */}
                <Card className="fixed bottom-4 left-2 right-2 sm:left-4 sm:right-4 md:hidden z-50 shadow-lg border-t border-gray-200/50">
                    <CardContent className="p-1 sm:p-2 bg-white/80 backdrop-blur-sm">
                        <nav className="flex justify-around">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex flex-col items-center p-1.5 sm:p-2 rounded-lg transition-colors duration-200 ${isActive
                                            ? 'text-[var(--primary)] font-medium'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <span className="text-lg sm:text-xl mb-0.5">{item.icon}</span>
                                        <span className="text-[10px] sm:text-xs">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <main className="flex-1 h-screen overflow-auto w-full pb-20 md:pb-0">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
} 
'use client';

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <Toaster />
        </SessionProvider>
    );
} 
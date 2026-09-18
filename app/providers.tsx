"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hidePublicChrome =
        pathname.startsWith("/admin") || pathname.startsWith("/cliente");

    return (
        <SessionProvider>
            {!hidePublicChrome && <Navbar />}
            <main
                className={
                    hidePublicChrome ? "min-h-screen flex-grow" : "flex-grow"
                }
            >
                {children}
            </main>
            {!hidePublicChrome && <Footer />}
            <Toaster />
        </SessionProvider>
    );
}

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
            <div
                className={
                    hidePublicChrome
                        ? "flex min-h-0 flex-1 flex-col"
                        : "flex-grow"
                }
            >
                {children}
            </div>
            {!hidePublicChrome && <Footer />}
            <Toaster />
        </SessionProvider>
    );
}

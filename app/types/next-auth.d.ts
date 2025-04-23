import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: string;
            email?: string | null;
            name?: string | null;
            image?: string | null;
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        id: string;
        role: string;
        email: string;
        name: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
        email: string;
        name: string;
    }
} 
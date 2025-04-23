import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: string;
            email?: string | null;
            name?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
        role: string;
        email?: string | null;
        name?: string | null;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string;
    }
} 
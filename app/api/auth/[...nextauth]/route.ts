import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/app/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/app/db/schema';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await db.query.usersTable.findFirst({
                    where: eq(usersTable.email, credentials.email),
                });

                if (!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                if (!passwordMatch) return null;

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existingUser = await db.query.usersTable.findFirst({
                    where: eq(usersTable.email, user.email!),
                });

                if (!existingUser) {
                    // Create new user from Google data
                    const [newUser] = await db.insert(usersTable)
                        .values({
                            name: user.name!,
                            email: user.email!,
                            role: "user",
                            phone: "",
                            password: "",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        })
                        .returning();

                    user.id = String(newUser.id);
                    user.role = newUser.role;
                } else {
                    user.id = String(existingUser.id);
                    user.role = existingUser.role;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub!;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            // Create a complete URL by combining baseUrl with the relative URL if needed
            const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
            const urlObj = new URL(fullUrl);
            const token = urlObj.searchParams.get('token');

            if (token) {
                const user = await db.query.usersTable.findFirst({
                    where: eq(usersTable.email, decodeURIComponent(token)),
                    columns: { role: true }
                });

                if (user?.role === 'admin') {
                    return `${baseUrl}/admin`;
                }
            }

            // Default redirect to dashboard
            return `${baseUrl}/cliente/dashboard`;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt" as const,
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
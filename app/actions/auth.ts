'use server';

import { eq } from "drizzle-orm";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { SignUpInput, SignInInput } from "@/app/db/schema";
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { getSession } from '@/app/lib/session';

export async function signUp(data: SignUpInput) {
    const { name, email, password, phone } = data;

    // Check if user already exists
    const existingUser = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
    });

    if (existingUser) {
        throw new Error("Usuário já existe com este e-mail");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create the user
        const [newUser] = await db
            .insert(usersTable)
            .values({
                name,
                email,
                phone,
                password: hashedPassword,
                role: "user",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set('session', JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        // Don't send the password back to the client
        const { password: _, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword };
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error("Erro ao criar usuário. Por favor, tente novamente.");
    }
}

export async function signIn(data: SignInInput) {
    const { email, password } = data;

    // Find the user
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
    });

    if (!user || !user.password) {
        throw new Error("Credenciais inválidas");
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Credenciais inválidas");
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });

    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
}

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    return { success: true };
}

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
    try {
        const session = await getSession();
        if (!session) {
            return { error: "Você precisa estar logado para alterar sua senha" };
        }

        // Find the user
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, session.id),
        });

        if (!user || !user.password) {
            return { error: "Usuário não encontrado" };
        }

        // Verify current password
        const passwordMatch = await bcrypt.compare(data.currentPassword, user.password);

        if (!passwordMatch) {
            return { error: "Senha atual incorreta" };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);

        // Update the password
        await db.update(usersTable)
            .set({
                password: hashedPassword,
                updatedAt: new Date(),
            })
            .where(eq(usersTable.id, session.id));

        return { success: true };
    } catch (error) {
        console.error('Error changing password:', error);
        return { error: "Erro ao alterar senha. Por favor, tente novamente." };
    }
} 
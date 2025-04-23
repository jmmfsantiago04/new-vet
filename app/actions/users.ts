'use server';

import { db } from '@/app/db';
import { usersTable } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { revalidatePath } from 'next/cache';

type SessionUser = {
    id: string;
    role?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
};

type Session = {
    user?: SessionUser;
    expires: string;
};

interface UpdateUserData {
    name: string;
    email: string;
    phone: string;
}

export async function updateUser(userId: number, data: UpdateUserData) {
    try {
        const session = await getServerSession(authOptions) as Session | null;
        if (!session?.user?.id) {
            return { error: 'Não autorizado' };
        }

        // Allow users to update their own profile or admins to update any profile
        if (parseInt(session.user.id) !== userId && session.user.role !== 'admin') {
            return { error: 'Não autorizado' };
        }

        // Check if email is already taken by another user
        const existingUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, data.email),
        });

        if (existingUser && existingUser.id !== userId) {
            return { error: 'Email já está em uso' };
        }

        // Update user
        await db.update(usersTable)
            .set({
                name: data.name,
                email: data.email,
                phone: data.phone,
                updatedAt: new Date(),
            })
            .where(eq(usersTable.id, userId));

        revalidatePath('/cliente/dashboard/profile');
        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Error updating user:', error);
        return { error: 'Erro ao atualizar usuário' };
    }
}

export async function deleteUser(userId: number) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return { error: 'Não autorizado' };
        }

        // Check if user exists and is not an admin
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, userId),
        });

        if (!user) {
            return { error: 'Usuário não encontrado' };
        }

        if (user.role === 'admin') {
            return { error: 'Não é possível excluir um administrador' };
        }

        // Delete user
        await db.delete(usersTable)
            .where(eq(usersTable.id, userId));

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { error: 'Erro ao excluir usuário' };
    }
} 
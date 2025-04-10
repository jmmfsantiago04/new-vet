'use server';

import { db } from '@/app/db';
import { usersTable } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/app/lib/session';
import { revalidatePath } from 'next/cache';

interface UpdateUserData {
    name: string;
    email: string;
    phone: string;
}

export async function updateUser(userId: number, data: UpdateUserData) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'admin') {
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

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error('Error updating user:', error);
        return { error: 'Erro ao atualizar usuário' };
    }
}

export async function deleteUser(userId: number) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'admin') {
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
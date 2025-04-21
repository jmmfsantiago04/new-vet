'use server';

import { eq } from "drizzle-orm";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return { error: "Você precisa estar logado para alterar sua senha" };
        }

        // Find the user
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, parseInt(session.user.id)),
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
            .where(eq(usersTable.id, parseInt(session.user.id)));

        return { success: true };
    } catch (error) {
        console.error('Error changing password:', error);
        return { error: "Erro ao alterar senha. Por favor, tente novamente." };
    }
} 
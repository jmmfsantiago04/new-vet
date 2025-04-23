import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/app/db"
import { usersTable } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { UserProfileForm } from "@/components/cliente/user-profile-form"

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

export default async function Page() {
    const session = await getServerSession(authOptions) as Session | null

    if (!session?.user?.id) {
        redirect('/login')
    }

    const userId = parseInt(session.user.id)
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, userId),
    })

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="container mx-auto py-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--primary)]">Configurações do Perfil</h1>
                <p className="text-[var(--text-secondary)]">
                    Gerencie suas informações pessoais e senha.
                </p>
            </div>

            <UserProfileForm
                user={{
                    id: userId,
                    name: user.name,
                    email: user.email,
                    phone: user.phone || "",
                }}
            />
        </div>
    )
} 
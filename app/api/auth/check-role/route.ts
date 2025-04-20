import { NextResponse } from 'next/server';
import { db } from '@/app/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/app/db/schema';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, email),
            columns: {
                role: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ role: user.role });
    } catch (error) {
        console.error('Error checking role:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 
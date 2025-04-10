import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import { usersTable, UserRole } from './schema';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

async function main() {
    try {
        // Check if admin already exists
        const existingAdmin = await db.query.usersTable.findFirst({
            where: (users, { eq }) => eq(users.email, 'admin@vetpay.com')
        });

        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin.email);
            return;
        }

        // Hash the admin password
        const hashedPassword = await bcrypt.hash('Admin@123', 10);

        // Create admin user
        const [admin] = await db
            .insert(usersTable)
            .values({
                name: 'Admin',
                email: 'admin@vetpay.com',
                phone: '+5571999999999',
                password: hashedPassword,
                role: UserRole.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        console.log('Admin user created successfully:', admin.email);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        process.exit(0);
    }
}

main(); 
import { db } from '@/app/db';
import { usersTable, UserRole } from '@/app/db/schema';
import bcrypt from 'bcrypt';

export async function seedUsers() {
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

        console.log('✅ Admin user created successfully:', admin.email);
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
} 
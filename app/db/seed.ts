import "./load-env";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { seedUsers } from "./seed/users";
import { seedFaq } from "./seed/faq";
import { seedBlog } from "./seed/blog";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

async function main() {
    try {
        await seedUsers();
        await seedFaq();
        await seedBlog();

        console.log("✅ Database seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

main();

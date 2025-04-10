import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

// Create a connection with pooling
const sql = neon(process.env.DATABASE_URL);

// Initialize Drizzle with the connection and custom batch settings
export const db = drizzle(sql, {
    schema,
    logger: process.env.NODE_ENV === 'development',
});

// Export the schema
export * from './schema'; 
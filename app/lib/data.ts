import { db } from '@/app/db';
import { petsTable } from '@/app/db/schema';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchPets() {
    noStore(); // Opt out of caching
    try {
        const pets = await db.select().from(petsTable);
        return pets;
    } catch (error) {
        console.error('Error fetching pets:', error);
        throw new Error('Failed to fetch pets data.');
    }
} 
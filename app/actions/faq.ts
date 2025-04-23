'use server';

import { db } from "@/app/db";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import {
    faqCategoriesTable,
    faqItemsTable,
    insertFaqCategorySchema,
    insertFaqItemSchema,
    type InsertFaqCategory,
    type InsertFaqItem,
} from "@/app/db/schema";

// Category Actions
export async function createFaqCategory(data: InsertFaqCategory) {
    try {
        // Get the highest order number and add 1
        const categories = await db.select({ order: faqCategoriesTable.order })
            .from(faqCategoriesTable)
            .orderBy(faqCategoriesTable.order)
            .limit(1);

        const nextOrder = categories.length > 0 ? categories[0].order + 1 : 0;

        const validatedData = insertFaqCategorySchema.parse({
            ...data,
            order: nextOrder,
        });

        await db.insert(faqCategoriesTable).values(validatedData);
        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error creating FAQ category:', error);
        return { success: false, error: 'Failed to create FAQ category' };
    }
}

export async function updateFaqCategory(id: number, data: Partial<InsertFaqCategory>) {
    try {
        const validatedData = insertFaqCategorySchema.partial().parse(data);

        await db.update(faqCategoriesTable)
            .set({
                ...validatedData,
                updatedAt: new Date(),
            })
            .where(eq(faqCategoriesTable.id, id));

        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error updating FAQ category:', error);
        return { success: false, error: 'Failed to update FAQ category' };
    }
}

export async function deleteFaqCategory(id: number) {
    try {
        // First, delete all items in this category
        await db.delete(faqItemsTable)
            .where(eq(faqItemsTable.categoryId, id));

        // Then delete the category
        await db.delete(faqCategoriesTable)
            .where(eq(faqCategoriesTable.id, id));

        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error deleting FAQ category:', error);
        return { success: false, error: 'Failed to delete FAQ category' };
    }
}

// Item Actions
export async function createFaqItem(data: InsertFaqItem) {
    try {
        // Get the highest order number for this category and add 1
        const items = await db.select({ order: faqItemsTable.order })
            .from(faqItemsTable)
            .where(eq(faqItemsTable.categoryId, data.categoryId))
            .orderBy(faqItemsTable.order)
            .limit(1);

        const nextOrder = items.length > 0 ? items[0].order + 1 : 0;

        const validatedData = insertFaqItemSchema.parse({
            ...data,
            order: nextOrder,
        });

        await db.insert(faqItemsTable).values(validatedData);
        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error creating FAQ item:', error);
        return { success: false, error: 'Failed to create FAQ item' };
    }
}

export async function updateFaqItem(id: number, data: Partial<InsertFaqItem>) {
    try {
        const validatedData = insertFaqItemSchema.partial().parse(data);

        await db.update(faqItemsTable)
            .set({
                ...validatedData,
                updatedAt: new Date(),
            })
            .where(eq(faqItemsTable.id, id));

        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error updating FAQ item:', error);
        return { success: false, error: 'Failed to update FAQ item' };
    }
}

export async function deleteFaqItem(id: number) {
    try {
        await db.delete(faqItemsTable)
            .where(eq(faqItemsTable.id, id));

        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error deleting FAQ item:', error);
        return { success: false, error: 'Failed to delete FAQ item' };
    }
}

// Utility Actions
export async function reorderFaqCategory(id: number, newOrder: number) {
    try {
        await db.update(faqCategoriesTable)
            .set({
                order: newOrder,
                updatedAt: new Date(),
            })
            .where(eq(faqCategoriesTable.id, id));

        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error reordering FAQ category:', error);
        return { success: false, error: 'Failed to reorder FAQ category' };
    }
}

export async function reorderFaqItem(id: number, categoryId: number, newOrder: number) {
    try {
        await db.update(faqItemsTable)
            .set({
                order: newOrder,
                updatedAt: new Date(),
            })
            .where(and(
                eq(faqItemsTable.id, id),
                eq(faqItemsTable.categoryId, categoryId)
            ));

        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error reordering FAQ item:', error);
        return { success: false, error: 'Failed to reorder FAQ item' };
    }
}

export async function toggleFaqItemActive(id: number) {
    try {
        // First get the current state
        const item = await db.select({ isActive: faqItemsTable.isActive })
            .from(faqItemsTable)
            .where(eq(faqItemsTable.id, id))
            .limit(1);

        if (!item.length) {
            throw new Error('FAQ item not found');
        }

        // Toggle the state
        await db.update(faqItemsTable)
            .set({
                isActive: !item[0].isActive,
                updatedAt: new Date(),
            })
            .where(eq(faqItemsTable.id, id));

        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Error toggling FAQ item active state:', error);
        return { success: false, error: 'Failed to toggle FAQ item active state' };
    }
}

// Query Actions
export async function getFaqCategories() {
    try {
        const categories = await db.select()
            .from(faqCategoriesTable)
            .orderBy(faqCategoriesTable.order);
        return { success: true, data: categories };
    } catch (error) {
        console.error('Error fetching FAQ categories:', error);
        return { success: false, error: 'Failed to fetch FAQ categories' };
    }
}

export async function getFaqItems(categoryId?: number) {
    try {
        const baseQuery = db.select()
            .from(faqItemsTable)
            .orderBy(faqItemsTable.order);

        const items = categoryId
            ? await baseQuery.where(eq(faqItemsTable.categoryId, categoryId))
            : await baseQuery;

        return { success: true, data: items };
    } catch (error) {
        console.error('Error fetching FAQ items:', error);
        return { success: false, error: 'Failed to fetch FAQ items' };
    }
} 
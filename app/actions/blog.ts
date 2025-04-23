'use server';

import { db } from "@/app/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import {
    blogCategoriesTable,
    blogPostsTable,
    insertBlogCategorySchema,
    insertBlogPostSchema,
    type InsertBlogCategory,
    type InsertBlogPost,
} from "@/app/db/schema";

// Category Actions
export async function createBlogCategory(data: InsertBlogCategory) {
    try {
        const validatedData = insertBlogCategorySchema.parse(data);
        await db.insert(blogCategoriesTable).values(validatedData);
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error('Error creating blog category:', error);
        return { success: false, error: 'Failed to create blog category' };
    }
}

export async function updateBlogCategory(id: number, data: Partial<InsertBlogCategory>) {
    try {
        const validatedData = insertBlogCategorySchema.partial().parse(data);
        await db.update(blogCategoriesTable)
            .set({
                ...validatedData,
                updatedAt: new Date(),
            })
            .where(eq(blogCategoriesTable.id, id));
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error('Error updating blog category:', error);
        return { success: false, error: 'Failed to update blog category' };
    }
}

export async function deleteBlogCategory(id: number) {
    try {
        // First, delete all posts in this category
        await db.delete(blogPostsTable)
            .where(eq(blogPostsTable.categoryId, id));

        // Then delete the category
        await db.delete(blogCategoriesTable)
            .where(eq(blogCategoriesTable.id, id));

        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error('Error deleting blog category:', error);
        return { success: false, error: 'Failed to delete blog category' };
    }
}

// Post Actions
export async function createBlogPost(data: InsertBlogPost) {
    try {
        const validatedData = insertBlogPostSchema.parse(data);
        await db.insert(blogPostsTable).values(validatedData);
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error('Error creating blog post:', error);
        return { success: false, error: 'Failed to create blog post' };
    }
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
    try {
        const validatedData = insertBlogPostSchema.partial().parse(data);
        await db.update(blogPostsTable)
            .set({
                ...validatedData,
                updatedAt: new Date(),
            })
            .where(eq(blogPostsTable.id, id));
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error('Error updating blog post:', error);
        return { success: false, error: 'Failed to update blog post' };
    }
}

export async function deleteBlogPost(id: number) {
    try {
        await db.delete(blogPostsTable)
            .where(eq(blogPostsTable.id, id));
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return { success: false, error: 'Failed to delete blog post' };
    }
}

export async function toggleBlogPostPublished(id: number) {
    try {
        const post = await db.select({ isPublished: blogPostsTable.isPublished })
            .from(blogPostsTable)
            .where(eq(blogPostsTable.id, id))
            .limit(1);

        if (!post.length) {
            throw new Error('Blog post not found');
        }

        await db.update(blogPostsTable)
            .set({
                isPublished: !post[0].isPublished,
                publishedAt: !post[0].isPublished ? new Date() : undefined,
                updatedAt: new Date(),
            })
            .where(eq(blogPostsTable.id, id));

        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error('Error toggling blog post published state:', error);
        return { success: false, error: 'Failed to toggle blog post published state' };
    }
}

// Query Actions
export async function getBlogCategories() {
    try {
        const categories = await db.select()
            .from(blogCategoriesTable)
            .orderBy(blogCategoriesTable.name);
        return { success: true, data: categories };
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        return { success: false, error: 'Failed to fetch blog categories' };
    }
}

export async function getBlogPosts() {
    try {
        const posts = await db.select({
            id: blogPostsTable.id,
            title: blogPostsTable.title,
            slug: blogPostsTable.slug,
            summary: blogPostsTable.summary,
            imageUrl: blogPostsTable.imageUrl,
            isPublished: blogPostsTable.isPublished,
            publishedAt: blogPostsTable.publishedAt,
            categoryId: blogPostsTable.categoryId,
            category: blogCategoriesTable.name,
        })
            .from(blogPostsTable)
            .leftJoin(blogCategoriesTable, eq(blogPostsTable.categoryId, blogCategoriesTable.id))
            .orderBy(blogPostsTable.publishedAt);

        return { success: true, data: posts };
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return { success: false, error: 'Failed to fetch blog posts' };
    }
} 
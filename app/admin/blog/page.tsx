import { db } from '@/app/db';
import { blogPostsTable, blogCategoriesTable } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import BlogTable from '@/components/admin/BlogTable';
import BlogCreate from '@/components/admin/BlogCreate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ListFilter } from "lucide-react";

export default async function BlogAdminPage() {
    // Fetch categories
    const categories = await db.select().from(blogCategoriesTable);

    // Fetch posts with categories
    const postsWithCategories = await db
        .select({
            id: blogPostsTable.id,
            title: blogPostsTable.title,
            slug: blogPostsTable.slug,
            summary: blogPostsTable.summary,
            imageUrl: blogPostsTable.imageUrl,
            isPublished: blogPostsTable.isPublished,
            publishedAt: blogPostsTable.publishedAt,
            categoryId: blogPostsTable.categoryId,
            categoryName: blogCategoriesTable.name,
        })
        .from(blogPostsTable)
        .leftJoin(blogCategoriesTable, eq(blogPostsTable.categoryId, blogCategoriesTable.id))
        .orderBy(blogPostsTable.publishedAt);

    // Map the results to match the BlogPost interface
    const posts = postsWithCategories.map(post => ({
        ...post,
        category: post.categoryName || 'Sem categoria' // Ensure category is always a string
    }));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Gerenciar Blog</h1>
                <p className="text-muted-foreground">
                    Gerencie os posts do blog
                </p>
            </div>

            <Tabs defaultValue="list" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="list" className="flex items-center gap-2">
                        <ListFilter className="h-4 w-4" />
                        <span>Lista de Posts</span>
                    </TabsTrigger>
                    <TabsTrigger value="create" className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        <span>Criar Post</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-4">
                    <BlogTable posts={posts} categories={categories} />
                </TabsContent>

                <TabsContent value="create" className="space-y-4">
                    <BlogCreate categories={categories} />
                </TabsContent>
            </Tabs>
        </div>
    );
} 
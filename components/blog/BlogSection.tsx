import { BlogCard } from "./BlogCard"
import { db } from "@/app/db"
import { blogPostsTable, blogCategoriesTable } from "@/app/db/schema"
import { eq } from "drizzle-orm"

export async function BlogSection() {
    // Fetch published blog posts with their categories
    const posts = await db
        .select({
            id: blogPostsTable.id,
            title: blogPostsTable.title,
            slug: blogPostsTable.slug,
            summary: blogPostsTable.summary,
            imageUrl: blogPostsTable.imageUrl,
            publishedAt: blogPostsTable.publishedAt,
            category: blogCategoriesTable.name,
        })
        .from(blogPostsTable)
        .leftJoin(blogCategoriesTable, eq(blogPostsTable.categoryId, blogCategoriesTable.id))
        .where(eq(blogPostsTable.isPublished, true))
        .orderBy(blogPostsTable.publishedAt)
        .limit(6); // Limit to 6 most recent posts

    return (
        <section className="py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[var(--primary)]">
                        Blog Veterinário
                    </h2>
                    <p className="mt-4 text-lg text-[var(--text-secondary)]">
                        Dicas e informações importantes para o bem-estar do seu pet
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard
                            key={post.id}
                            slug={post.slug}
                            title={post.title}
                            summary={post.summary}
                            date={post.publishedAt.toLocaleDateString('pt-BR')}
                            imageUrl={post.imageUrl}
                            category={post.category || 'Sem categoria'}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
} 
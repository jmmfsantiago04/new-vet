import { BlogCard, BlogCardSkeleton } from "./BlogCard"
import { db } from "@/app/db"
import { blogPostsTable, blogCategoriesTable } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import * as motion from "motion/react-client"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

const fadeUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
}

const titleAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
}

const cardAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
}

function BlogSectionSkeleton() {
    return (
        <section className="py-8 sm:py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 mx-auto mb-4" />
                    <Skeleton className="h-5 sm:h-6 w-full max-w-2xl mx-auto" />
                </div>

                <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index} className="w-full">
                            <BlogCardSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export async function BlogSection() {
    // Fetch all published posts
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
        .orderBy(blogPostsTable.publishedAt);

    return (
        <section className="py-8 sm:py-12 md:py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<BlogSectionSkeleton />}>
                    <motion.div
                        className="text-center mb-8 sm:mb-12"
                        {...fadeUpAnimation}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary)]"
                            {...titleAnimation}
                            transition={{ delay: 0.2 }}
                        >
                            Blog Veterinário
                        </motion.h2>
                        <motion.p
                            className="mt-3 sm:mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto"
                            {...fadeUpAnimation}
                            transition={{ delay: 0.4 }}
                        >
                            Dicas e informações importantes para o bem-estar do seu pet
                        </motion.p>
                    </motion.div>

                    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                {...cardAnimation}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="w-full h-full"
                            >
                                <BlogCard
                                    slug={post.slug}
                                    title={post.title}
                                    summary={post.summary}
                                    date={post.publishedAt.toLocaleDateString('pt-BR')}
                                    imageUrl={post.imageUrl}
                                    category={post.category || 'Sem categoria'}
                                />
                            </motion.div>
                        ))}
                    </div>
                </Suspense>
            </div>
        </section>
    )
} 
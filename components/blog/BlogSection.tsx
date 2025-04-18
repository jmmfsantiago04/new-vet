import { BlogCard, BlogCardSkeleton } from "./BlogCard"
import { db } from "@/app/db"
import { blogPostsTable, blogCategoriesTable } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import * as motion from "motion/react-client"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface BlogSectionProps {
    currentPage?: number
    totalPages?: number
}

function BlogSectionSkeleton() {
    return (
        <section className="py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Skeleton className="h-10 w-64 mx-auto mb-4" />
                    <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <BlogCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export async function BlogSection({ currentPage = 1, totalPages = 1 }: BlogSectionProps) {
    const postsPerPage = 6;
    const offset = (currentPage - 1) * postsPerPage;

    // First, get total count for pagination
    const totalPosts = await db
        .select({ count: blogPostsTable.id })
        .from(blogPostsTable)
        .where(eq(blogPostsTable.isPublished, true));

    const calculatedTotalPages = Math.ceil(Number(totalPosts[0].count) / postsPerPage);

    // Then fetch paginated posts
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
        .limit(postsPerPage)
        .offset(offset);

    return (
        <section className="py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<BlogSectionSkeleton />}>
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            className="text-3xl font-bold text-[var(--primary)]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Blog Veterinário
                        </motion.h2>
                        <motion.p
                            className="mt-4 text-lg text-[var(--text-secondary)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Dicas e informações importantes para o bem-estar do seu pet
                        </motion.p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
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

                    {calculatedTotalPages > 1 && (
                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : '#'}
                                            aria-disabled={currentPage === 1}
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: calculatedTotalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                href={`/blog?page=${page}`}
                                                isActive={currentPage === page}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            href={currentPage < calculatedTotalPages ? `/blog?page=${currentPage + 1}` : '#'}
                                            aria-disabled={currentPage === calculatedTotalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </motion.div>
                    )}
                </Suspense>
            </div>
        </section>
    )
} 
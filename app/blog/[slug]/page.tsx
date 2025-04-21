import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { db } from "@/app/db"
import { blogPostsTable, blogCategoriesTable } from "@/app/db/schema"
import { eq } from "drizzle-orm"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;

    const post = await db.query.blogPostsTable.findFirst({
        where: (posts, { eq }) => eq(posts.slug, slug)
    });

    if (!post) {
        return {
            title: 'Post não encontrado | Vet Online',
            description: 'O post que você procura não foi encontrado.'
        }
    }

    return {
        title: `${post.title} | Vet Online`,
        description: post.summary
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const post = await db
        .select({
            title: blogPostsTable.title,
            summary: blogPostsTable.summary,
            content: blogPostsTable.content,
            imageUrl: blogPostsTable.imageUrl,
            publishedAt: blogPostsTable.publishedAt,
            category: blogCategoriesTable.name,
        })
        .from(blogPostsTable)
        .leftJoin(blogCategoriesTable, eq(blogPostsTable.categoryId, blogCategoriesTable.id))
        .where(eq(blogPostsTable.slug, slug))
        .limit(1);

    if (!post[0]) {
        notFound()
    }

    const blogPost = post[0];

    return (
        <main className="min-h-screen py-12">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">
                        {blogPost.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-[var(--text-secondary)]">
                        <time dateTime={blogPost.publishedAt.toISOString()}>
                            {blogPost.publishedAt.toLocaleDateString('pt-BR')}
                        </time>
                        <Badge variant="secondary">{blogPost.category || 'Sem categoria'}</Badge>
                    </div>
                </header>

                <div className="relative w-full h-[400px] mb-12">
                    <Image
                        src={blogPost.imageUrl}
                        alt={blogPost.title}
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>

                <div className="prose prose-lg max-w-none">
                    <p className="text-[var(--text-secondary)] mb-6">
                        {blogPost.summary}
                    </p>
                    <div
                        className="text-[var(--text-secondary)]"
                        dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />
                </div>
            </article>
        </main>
    )
} 
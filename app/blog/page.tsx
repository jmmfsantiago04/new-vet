import { BlogSection } from "@/components/blog/BlogSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog | Vet Online",
    description: "Artigos e dicas sobre saúde e bem-estar animal.",
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

    return (
        <main className="min-h-screen">
            <BlogSection currentPage={page} />
        </main>
    )
} 
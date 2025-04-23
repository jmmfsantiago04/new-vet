import { BlogSection } from "@/components/blog/BlogSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog | Vet Online",
    description: "Artigos e dicas sobre saúde e bem-estar animal.",
}

interface PageProps {
    params: { [key: string]: string | undefined }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function BlogPage({ searchParams = {} }: PageProps) {
    const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

    return (
        <main className="min-h-screen">
            <BlogSection currentPage={page} />
        </main>
    )
} 
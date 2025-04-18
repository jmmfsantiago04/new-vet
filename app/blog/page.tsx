import { BlogSection } from "@/components/blog/BlogSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog | Vet Online",
    description: "Artigos e dicas sobre saúde e bem-estar animal.",
}

type SearchParams = {
    page?: string
}

interface PageProps {
    searchParams: SearchParams
}

export default async function BlogPage({ searchParams }: PageProps) {
    const page = searchParams?.page ? parseInt(searchParams.page) : 1;

    return (
        <main className="min-h-screen">
            <BlogSection currentPage={page} />
        </main>
    )
} 
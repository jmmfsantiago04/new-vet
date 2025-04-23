import { BlogSection } from "@/components/blog/BlogSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog | Vet Online",
    description: "Artigos e dicas sobre saúde e bem-estar animal.",
}

type SearchParams = {
    page?: string
}

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BlogPage({ searchParams }: Props) {
    const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

    return (
        <main className="min-h-screen">
            <BlogSection currentPage={page} />
        </main>
    )
} 
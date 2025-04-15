import { BlogSection } from "@/components/blog/BlogSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog | Vet Online",
    description: "Artigos e dicas sobre saúde e bem-estar animal.",
}

export default async function BlogPage() {
    return (
        <main className="min-h-screen">
            <section className="bg-gradient-to-b from-blue-50/50 to-blue-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">
                        Blog Veterinário
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)]">
                        Fique por dentro das últimas novidades e dicas sobre cuidados com pets
                    </p>
                </div>
            </section>
            {/* @ts-expect-error Async Server Component */}
            <BlogSection />
        </main>
    )
} 
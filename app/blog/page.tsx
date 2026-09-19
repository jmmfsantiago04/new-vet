import { BlogSection } from "@/components/blog/BlogSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog | VetPay",
    description: "Artigos e dicas sobre saúde e bem-estar animal.",
}

export default function BlogPage() {
    return (
        <div className="">
            <BlogSection />
        </div>
    )
} 
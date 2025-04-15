import FaqContent from "@/components/faq/FaqContent"
import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { db } from "@/app/db"
import { faqCategoriesTable, faqItemsTable } from "@/app/db/schema"

export const metadata: Metadata = {
    title: "FAQ | Vet Online",
    description: "Encontre respostas para as perguntas mais frequentes sobre nossos serviços veterinários online.",
}

export default async function FaqPage() {
    // Fetch FAQ data
    const categories = await db.select().from(faqCategoriesTable).orderBy(faqCategoriesTable.order);
    const items = await db.select().from(faqItemsTable).orderBy(faqItemsTable.order);

    // Organize items by category
    const categoriesWithItems = categories.map(category => ({
        ...category,
        items: items.filter(item => item.categoryId === category.id)
    }));

    return (
        <main className="flex min-h-screen flex-col">
            <section className="bg-gradient-to-b from-blue-50/50 to-blue-50 py-16 relative overflow-hidden">

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <div className="flex justify-center mb-6">

                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--primary)] tracking-tight">
                        Como podemos ajudar?
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                        Encontre respostas para as perguntas mais comuns sobre nossos serviços veterinários online.
                        Não encontrou o que procura? Entre em contato conosco.
                    </p>
                </div>
            </section>
            <FaqContent categories={categoriesWithItems} />
        </main>
    )
} 
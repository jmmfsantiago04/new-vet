import FaqContent from "@/components/faq/FaqContent"
import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
    title: "FAQ | Vet Online",
    description: "Encontre respostas para as perguntas mais frequentes sobre nossos serviços veterinários online.",
}

export default function FaqPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <section className="bg-gradient-to-b from-blue-50/50 to-blue-50 py-16 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--primary)]/5 rounded-full"></div>
                    <div className="absolute top-1/2 -right-12 w-32 h-32 bg-[var(--primary)]/5 rounded-full"></div>
                    <div className="absolute -bottom-8 left-1/3 w-16 h-16 bg-[var(--primary)]/5 rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <div className="flex justify-center mb-6">
                        <Badge
                            variant="default"
                            className="bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20"
                        >
                            Suporte
                        </Badge>
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
            <FaqContent />
        </main>
    )
} 
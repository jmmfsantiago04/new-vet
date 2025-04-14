import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTAServices() {
    return (
        <section className="relative py-16 md:py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[var(--primary)]">
                    Pronto para Começar?
                </h2>
                <p className="text-base md:text-lg text-[var(--text-secondary)] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                    Escolha o serviço que melhor atende às suas necessidades e agende sua consulta hoje. Nossos
                    veterinários estão aqui para ajudar!
                </p>
                <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <Link
                        href="https://wa.me/5571991916499"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Entre em Contato
                    </Link>
                </Button>

                {/* Added decorative paw prints */}
                <div className="mt-8 flex justify-center space-x-8">
                    <span className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl">🐾</span>
                    <span className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl">🐾</span>
                    <span className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl">🐾</span>
                </div>
            </div>
        </section>
    )
} 
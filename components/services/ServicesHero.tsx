import { cn } from "@/lib/utils"

interface ServicesHeroProps {
    className?: string
}

export function ServicesHero({ className }: ServicesHeroProps) {
    return (
        <section className={cn("relative py-16 md:py-20 lg:py-24 bg-blue-50", className)}>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 tracking-tight text-[var(--primary)]">
                        Nossos Serviços Veterinários Online
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Cuidados profissionais para seu pet no conforto da sua casa. Escolha o serviço que melhor
                        atende às suas necessidades.
                    </p>

                    {/* Added decorative paw prints */}
                    <div className="mt-8 flex justify-center space-x-8">
                        <span className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl">🐾</span>
                        <span className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl">🐾</span>
                        <span className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl">🐾</span>
                    </div>
                </div>
            </div>
        </section>
    )
} 
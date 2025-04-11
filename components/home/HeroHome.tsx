import Image from 'next/image'

export default function HeroHome() {
    return (
        <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-[var(--primary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                    <div className="text-white space-y-4 sm:space-y-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            Atendimento Veterinário Profissional no Conforto da Sua Casa
                        </h1>
                        <p className="text-base sm:text-lg text-white/90 max-w-xl">
                            Conecte-se com veterinários licenciados 24/7 para orientação especializada,
                            consultas e tranquilidade no cuidado com seu pet.
                        </p>
                        <div className="pt-2 sm:pt-4">
                            <a
                                href="https://wa.me/5571991916499"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-white text-[var(--primary)] px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                            >
                                Começar Agora
                                <span className="ml-2">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] mt-6 md:mt-0 rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/placeholder-vet.jpg"
                            alt="Veterinário com pet"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 
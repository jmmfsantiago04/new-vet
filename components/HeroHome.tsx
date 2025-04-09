import Image from 'next/image'

export default function HeroHome() {
    return (
        <section className="py-16 md:py-24 bg-[var(--primary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="text-white">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Atendimento Veterinário Profissional no Conforto da Sua Casa
                        </h1>
                        <p className="text-lg text-white/90 mb-8">
                            Conecte-se com veterinários licenciados 24/7 para orientação especializada,
                            consultas e tranquilidade no cuidado com seu pet.
                        </p>
                        <a
                            href="https://wa.me/5571991916499"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-white text-[var(--primary)] px-8 py-3 rounded-xl text-lg font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                        >
                            Começar Agora
                            <span className="ml-2">→</span>
                        </a>
                    </div>
                    <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
                        <Image
                            src="/placeholder-vet.jpg"
                            alt="Veterinário com pet"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 
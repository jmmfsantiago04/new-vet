import Image from 'next/image'

export default function HeroHome() {
    return (
        <section className="bg-[var(--primary)] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl text-shadow-black/75  md:text-5xl font-bold mb-6 leading-tight">
                            Atendimento Veterinário Profissional no Conforto da Sua Casa
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Conecte-se com veterinários licenciados 24/7 para orientação especializada,
                            consultas e tranquilidade no cuidado com seu pet.
                        </p>
                        <a
                            href="https://wa.me/5571991916499"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-white text-[var(--primary)] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                        >
                            Começar Agora
                            <span className="ml-2">→</span>
                        </a>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/placeholder-vet.jpg"
                            alt="Veterinário com pet"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 
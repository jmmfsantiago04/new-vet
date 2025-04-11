import Image from 'next/image'

export default function DocProfileAbout() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/dr-mauricio.jpg"
                            alt="Dr. Mauricio Faria"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-2xl"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                            Dr. Mauricio Faria
                        </h2>
                        <div className="space-y-4 text-[var(--text-secondary)]">
                            <p>
                                Com mais de 30 anos de serviço dedicado à medicina veterinária, o Dr. Mauricio
                                Faria é um nome respeitado no cuidado com animais em Salvador. Sua jornada na
                                medicina veterinária começou com uma paixão por ajudar animais e evoluiu para
                                uma missão de tornar o atendimento veterinário de qualidade mais acessível a todos.
                            </p>
                            <p>
                                Como fundador e veterinário chefe de sua clínica de sucesso em Salvador, Dr.
                                Faria já tratou milhares de pets, adquirindo uma experiência inestimável em vários
                                aspectos da medicina veterinária. Sua expertise abrange desde cuidados de rotina até
                                procedimentos médicos complexos, sempre mantendo os mais altos padrões da prática veterinária.
                            </p>
                            <p>
                                Reconhecendo as necessidades em constante mudança dos tutores de pets e as vantagens da
                                tecnologia moderna, Dr. Faria expandiu seus serviços para incluir consultas online.
                                Essa abordagem inovadora permite que ele alcance mais tutores de pets enquanto mantém
                                o mesmo nível de atendimento profissional e atenção personalizada que tem definido
                                sua prática por três décadas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 
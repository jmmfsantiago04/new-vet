export default function HowToHome() {
    const steps = [
        {
            step: '1',
            title: 'Agende sua Consulta',
            description: 'Escolha um horário conveniente para sua consulta',
        },
        {
            step: '2',
            title: 'Conheça seu Veterinário',
            description: 'Conecte-se com um veterinário qualificado por videochamada',
        },
        {
            step: '3',
            title: 'Receba o Plano de Cuidados',
            description: 'Receba recomendações e tratamentos personalizados',
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--primary)]">
                    Como Funciona
                </h2>
                <p className="text-lg text-center text-[var(--text-secondary)] mb-12">
                    Processo simples e eficiente para cuidar da saúde do seu pet
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-[var(--primary)] rounded-xl text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                                {step.step}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">
                                {step.title}
                            </h3>
                            <p className="text-[var(--text-secondary)]">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary)]">
                        Como Funciona
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Processo simples e eficiente para cuidar da saúde do seu pet
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="text-center bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary)] rounded-xl text-white text-lg sm:text-xl font-bold flex items-center justify-center mb-4">
                                {step.step}
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-[var(--primary)]">
                                {step.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
export default function HomeServices() {
    const services = [
        {
            title: 'Consultas por Vídeo',
            description: 'Atendimento virtual face a face com veterinários experientes',
            icon: '🎥',
            bgColor: 'bg-[var(--primary)]'
        },
        {
            title: 'Suporte 24/7',
            description: 'Mensagens instantâneas com profissionais veterinários a qualquer hora',
            icon: '💬',
            bgColor: 'bg-[var(--primary)]'
        },
        {
            title: 'Acompanhamento',
            description: 'Suporte contínuo e monitoramento da saúde do seu pet',
            icon: '🏥',
            bgColor: 'bg-[var(--primary)]'
        },
    ];

    return (
        <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary)]">
                        Nossos Serviços
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Oferecemos uma gama completa de serviços veterinários para cuidar do seu pet
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="p-6 sm:p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${service.bgColor} text-white mb-4 sm:mb-6`}>
                                {service.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-[var(--primary)]">
                                {service.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
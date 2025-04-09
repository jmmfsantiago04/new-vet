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
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--primary)]">
                    Nossos Serviços
                </h2>
                <p className="text-lg text-center text-[var(--text-secondary)] mb-12">
                    Oferecemos uma gama completa de serviços veterinários para cuidar do seu pet
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className={`w-12 h-12 mb-6 rounded-xl flex items-center justify-center text-2xl ${service.bgColor} text-white`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">
                                {service.title}
                            </h3>
                            <p className="text-[var(--text-secondary)]">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
import * as motion from "motion/react-client"

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
        <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12"
                    initial={{ opacity: 0, backgroundColor: "rgb(255, 255, 255)" }}
                    whileInView={{ opacity: 1, backgroundColor: "rgb(239, 246, 255)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary)]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Nossos Serviços
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Oferecemos uma gama completa de serviços veterinários para cuidar do seu pet
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="p-6 sm:p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                            initial={{ opacity: 0, backgroundColor: "rgb(255, 255, 255)" }}
                            whileInView={{ opacity: 1, backgroundColor: "rgb(255, 255, 255)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${service.bgColor} text-white mb-4 sm:mb-6`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                {service.icon}
                            </motion.div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-[var(--primary)]">
                                {service.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
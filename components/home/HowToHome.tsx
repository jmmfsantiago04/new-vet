import * as motion from "motion/react-client"

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
                        Como Funciona
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Processo simples e eficiente para cuidar da saúde do seu pet
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="text-center bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center"
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
                                className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary)] rounded-xl text-white text-lg sm:text-xl font-bold flex items-center justify-center mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                {step.step}
                            </motion.div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-[var(--primary)]">
                                {step.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
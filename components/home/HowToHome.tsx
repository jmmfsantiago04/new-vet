import * as motion from "motion/react-client"

const fadeInAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true }
}

const slideUpAnimation = {
    initial: { y: 100, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true }
}

const cardAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    whileHover: { scale: 1.05 }
}

const steps = [
    {
        number: '01',
        title: 'Agende uma consulta',
        description: 'Escolha o horário mais conveniente para você e seu pet',
        icon: '📅'
    },
    {
        number: '02',
        title: 'Conheça o veterinário',
        description: 'Atendimento por vídeo chamada com profissionais experientes',
        icon: '👨‍⚕️'
    },
    {
        number: '03',
        title: 'Receba o plano de cuidados',
        description: 'Orientações personalizadas para o bem-estar do seu pet',
        icon: '📋'
    }
];

export default function HowToHome() {
    return (
        <section className="py-16 sm:py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center space-y-4 mb-12 sm:mb-16"
                    {...fadeInAnimation}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary)]"
                        {...slideUpAnimation}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Como funciona?
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto"
                        {...slideUpAnimation}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Conheça o passo a passo para agendar uma consulta veterinária
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative p-6 sm:p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                            {...cardAnimation}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <span className="text-4xl sm:text-5xl mb-2">{step.icon}</span>
                                <span className="text-sm font-semibold text-[var(--primary)] bg-blue-100 px-3 py-1 rounded-full">
                                    {step.number}
                                </span>
                                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary)]">
                                    {step.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
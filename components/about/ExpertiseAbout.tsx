import * as motion from "motion/react-client"

const fadeUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
}

const fadeInAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true }
}

const iconAnimation = {
    initial: { scale: 0.8 },
    whileInView: { scale: 1 },
    viewport: { once: true },
    whileHover: {
        scale: 1.1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
}

const cardAnimation = {
    ...fadeUpAnimation,
    whileHover: {
        scale: 1.05,
        transition: { duration: 0.2 }
    }
}

export default function ExpertiseAbout() {
    const expertiseItems = [
        {
            title: 'Experiência Clínica',
            description:
                'Décadas de experiência prática no tratamento de diversas condições e emergências de pets.',
            icon: '🏥',
        },
        {
            title: 'Abordagem Moderna',
            description:
                'Combinando conhecimento veterinário tradicional com recursos modernos de telemedicina.',
            icon: '💻',
        },
        {
            title: 'Educação Continuada',
            description:
                'Participação regular em congressos veterinários e desenvolvimento profissional contínuo.',
            icon: '📚',
        },
    ]

    return (
        <section className="py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12"
                    {...fadeUpAnimation}
                    transition={{ duration: 0.5 }}
                >
                    Nossa Expertise
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {expertiseItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-lg"
                            {...cardAnimation}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <motion.div
                                className="text-4xl mb-4"
                                {...iconAnimation}
                            >
                                {item.icon}
                            </motion.div>
                            <motion.h3
                                className="text-xl font-semibold text-[var(--text-primary)] mb-2"
                                {...fadeInAnimation}
                                transition={{ delay: 0.3 + index * 0.2 }}
                            >
                                {item.title}
                            </motion.h3>
                            <motion.p
                                className="text-[var(--text-secondary)]"
                                {...fadeInAnimation}
                                transition={{ delay: 0.4 + index * 0.2 }}
                            >
                                {item.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
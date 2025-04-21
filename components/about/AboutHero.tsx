import * as motion from "motion/react-client"

const fadeUpAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
}

export default function AboutHero() {
    return (
        <motion.section
            className="bg-blue-50 py-20"
            {...fadeUpAnimation}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1
                    className="text-4xl font-bold mb-6 text-[var(--primary)]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Sobre Nós
                </motion.h1>
                <motion.p
                    className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto"
                    {...fadeUpAnimation}
                    transition={{ delay: 0.4 }}
                >
                    Trazendo mais de três décadas de experiência veterinária até você
                </motion.p>
            </div>
        </motion.section>
    )
} 
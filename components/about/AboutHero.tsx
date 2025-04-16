import * as motion from "motion/react-client"

export default function AboutHero() {
    return (
        <section className="bg-blue-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Trazendo mais de três décadas de experiência veterinária até você
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
} 
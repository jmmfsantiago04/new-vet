import Image from 'next/image'
import * as motion from "motion/react-client"

export default function HeroHome() {
    return (
        <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                    <motion.div
                        className="space-y-4 sm:space-y-6"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[var(--primary)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Atendimento Veterinário Profissional no Conforto da Sua Casa
                        </motion.h1>
                        <motion.p
                            className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Conecte-se com veterinários licenciados 24/7 para orientação especializada,
                            consultas e tranquilidade no cuidado com seu pet.
                        </motion.p>
                        <motion.div
                            className="pt-2 sm:pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.a
                                href="https://wa.me/5571991916499"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-[var(--primary)] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-[var(--primary)]/90 shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Começar Agora
                                <span className="ml-2">→</span>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="relative w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] mt-6 md:mt-0 rounded-xl overflow-hidden shadow-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Image
                            src="/placeholder-vet.jpg"
                            alt="Veterinário com pet"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
} 
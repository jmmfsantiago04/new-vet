import Link from "next/link"
import * as motion from "motion/react-client"
import { Button } from "@/components/ui/button"

export function CTAServices() {
    return (
        <section className="relative py-16 md:py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[var(--primary)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Pronto para Começar?
                </motion.h2>
                <motion.p
                    className="text-base md:text-lg text-[var(--text-secondary)] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Escolha o serviço que melhor atende às suas necessidades e agende sua consulta hoje. Nossos
                    veterinários estão aqui para ajudar!
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Link
                            href="https://wa.me/5571991916499"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Entre em Contato
                        </Link>
                    </Button>
                </motion.div>

                {/* Sequential paw prints */}
                <motion.div
                    className="mt-8 flex justify-center space-x-8"
                >
                    {[0, 1, 2].map((index) => (
                        <motion.span
                            key={index}
                            className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl"
                            initial={{
                                opacity: 0,
                                scale: 0,
                                y: 20
                            }}
                            whileInView={{
                                opacity: [0, 1, 0.8],
                                scale: [0, 1.2, 1],
                                y: 0
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.3,
                                times: [0, 0.6, 1]
                            }}
                        >
                            🐾
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
} 
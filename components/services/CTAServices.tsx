import Link from "next/link"
import * as motion from "motion/react-client"
import { Button } from "@/components/ui/button"

const containerAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
}

const buttonAnimation = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
}

const pawAnimation = {
    initial: { opacity: 0, scale: 0, y: 20 },
    whileInView: { opacity: [0, 1, 0.8], scale: [0, 1.2, 1], y: 0 },
    viewport: { once: true }
}

export function CTAServices() {
    return (
        <section className="relative py-16 md:py-24 bg-[var(--primary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center space-y-8"
                    {...containerAnimation}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Pronto para cuidar melhor do seu pet?
                    </h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">
                        Comece agora mesmo com nossa consulta online e garanta o melhor atendimento veterinário para seu companheiro.
                    </p>
                    <motion.div {...buttonAnimation}>
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-[var(--primary)] hover:bg-white/90"
                        >
                            <Link
                                href="https://wa.me/5571991916499"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Agendar Consulta
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Sequential paw prints */}
                <motion.div className="mt-8 flex justify-center space-x-8">
                    {[0, 1, 2].map((index) => (
                        <motion.span
                            key={index}
                            className="w-12 h-12 md:w-16 md:h-16 text-blue-400/30 text-3xl md:text-4xl"
                            {...pawAnimation}
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
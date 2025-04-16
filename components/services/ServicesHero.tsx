import { cn } from "@/lib/utils"
import * as motion from "motion/react-client"

interface ServicesHeroProps {
    className?: string
}

export function ServicesHero({ className }: ServicesHeroProps) {
    return (
        <section className={cn("relative py-16 md:py-20 lg:py-24 bg-blue-50", className)}>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 tracking-tight text-[var(--primary)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Nossos Serviços Veterinários Online
                    </motion.h1>
                    <motion.p
                        className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Cuidados profissionais para seu pet no conforto da sua casa. Escolha o serviço que melhor
                        atende às suas necessidades.
                    </motion.p>

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
                </motion.div>
            </div>
        </section>
    )
} 
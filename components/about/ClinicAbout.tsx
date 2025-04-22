import Image from 'next/image'
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

const slideLeftAnimation = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true }
}

const slideLeftSmallAnimation = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true }
}

const imageAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    whileHover: {
        scale: 1.05,
        transition: { duration: 0.2 }
    }
}

export default function ClinicAbout() {
    const contactInfo = [
        {
            text: "Salvador, Bahia",
            icon: (
                <svg
                    className="w-5 h-5 text-[var(--primary)] mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            )
        },
        {
            text: "Aberto de Segunda a Sábado",
            icon: (
                <svg
                    className="w-5 h-5 text-[var(--primary)] mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            )
        }
    ]

    return (
        <section className="py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-8"
                    {...fadeUpAnimation}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-2xl font-bold text-[var(--text-primary)] mb-6"
                        {...fadeUpAnimation}
                        transition={{ delay: 0.2 }}
                    >
                        Nossa Clínica Física
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            {...slideLeftAnimation}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <motion.p
                                className="text-[var(--text-secondary)] mb-4"
                                {...fadeInAnimation}
                                transition={{ delay: 0.4 }}
                            >
                                Embora ofereçamos consultas online abrangentes, nossa clínica física em
                                Salvador continua fornecendo atendimento veterinário completo. Nossas instalações
                                modernas são equipadas com equipamentos médicos de última geração e contam com
                                profissionais experientes.
                            </motion.p>
                            {contactInfo.map((info, index) => (
                                <motion.p
                                    key={index}
                                    className="flex items-center text-[var(--text-secondary)] mt-2"
                                    {...slideLeftSmallAnimation}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                >
                                    {info.icon}
                                    {info.text}
                                </motion.p>
                            ))}
                        </motion.div>
                        <motion.div
                            className="relative h-[200px] rounded-xl overflow-hidden"
                            {...imageAnimation}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Image
                                src="/clinic.jpg"
                                alt="Nossa Clínica Veterinária"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-xl"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
} 
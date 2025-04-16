import Link from "next/link"
import * as motion from "motion/react-client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Service {
    id: number
    name: string
    description: string
    price: string
    duration: string
    features: string[]
    icon: string
    image: string
}

const services: Service[] = [
    {
        id: 1,
        name: 'Consulta por Vídeo',
        description:
            'Consultas virtuais face a face com veterinários experientes para orientação abrangente no cuidado com seu pet.',
        price: 'R$120',
        duration: '30 minutos',
        features: [
            'Interação por vídeo em tempo real',
            'Avaliação comportamental',
            'Orientação sobre dieta e nutrição',
            'Recomendações de acompanhamento',
            'Prescrição digital quando necessário',
            'Disponibilidade 24/7',
        ],
        icon: '🎥',
        image: '/video-consultation.jpg',
    },
    {
        id: 2,
        name: 'Suporte por Chat',
        description:
            'Mensagens instantâneas com profissionais veterinários para dúvidas rápidas e suporte contínuo no cuidado com seu pet.',
        price: 'R$60',
        duration: 'Ilimitado por 24 horas',
        features: [
            'Resposta rápida',
            'Compartilhamento de fotos',
            'Instruções de cuidados',
            'Orientação sobre medicamentos',
            'Recomendações de dieta',
            'Dicas de prevenção',
        ],
        icon: '💬',
        image: '/chat-support.jpg',
    },
    {
        id: 3,
        name: 'Suporte Emergencial',
        description:
            'Acesso prioritário a veterinários para preocupações urgentes com a saúde do seu pet e orientação imediata.',
        price: 'R$180',
        duration: 'Resposta em 15 min',
        features: [
            'Acesso emergencial 24/7',
            'Atendimento prioritário',
            'Orientação para urgências',
            'Primeiros socorros',
            'Encaminhamento hospitalar se necessário',
            'Acompanhamento posterior',
        ],
        icon: '🚨',
        image: '/emergency-support.jpg',
    },
]

export function ServicesSection() {
    return (
        <section className="relative py-12 md:py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 place-items-start">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card className="w-full max-w-sm mx-auto bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="space-y-2">
                                    <motion.div
                                        className="text-5xl mb-2"
                                        initial={{ scale: 0.8 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        whileHover={{
                                            scale: 1.1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 10
                                            }
                                        }}
                                    >
                                        {service.icon}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                    >
                                        <CardTitle className="text-xl font-bold text-[var(--primary)]">{service.name}</CardTitle>
                                        <CardDescription className="text-sm leading-normal text-[var(--text-secondary)]">
                                            {service.description}
                                        </CardDescription>
                                    </motion.div>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <motion.div
                                        className="flex justify-between items-center mb-6"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <Badge variant="default" className="text-base px-2.5 py-0.5 bg-[var(--primary)] hover:bg-[var(--primary)]/90">
                                            {service.price}
                                        </Badge>
                                        <span className="text-sm text-[var(--text-secondary)]">
                                            {service.duration}
                                        </span>
                                    </motion.div>
                                    <motion.ul
                                        className="space-y-2.5"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        {service.features.map((feature, featureIndex) => (
                                            <motion.li
                                                key={featureIndex}
                                                className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.4 + (featureIndex * 0.1) }}
                                            >
                                                <svg
                                                    className="w-4 h-4 text-[var(--primary)] mt-0.5 shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="leading-tight">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                                <CardFooter className="pt-4">
                                    <motion.div
                                        className="w-full"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button asChild className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90">
                                            <Link
                                                href="https://wa.me/5571991916499"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Agendar Agora
                                            </Link>
                                        </Button>
                                    </motion.div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 
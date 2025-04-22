import * as motion from "motion/react-client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Condition {
    category: string
    conditions: string[]
}

const commonConditions: Condition[] = [
    {
        category: 'Comportamental',
        conditions: ['Ansiedade', 'Agressividade', 'Adestramento', 'Latidos Excessivos'],
    },
    {
        category: 'Digestivo',
        conditions: ['Vômito', 'Diarreia', 'Perda de Apetite', 'Alterações de Peso'],
    },
    {
        category: 'Pele e Pelagem',
        conditions: ['Coceira', 'Alergias', 'Queda de Pelo', 'Hotspots'],
    },
    {
        category: 'Bem-estar Geral',
        conditions: ['Orientação sobre Vacinas', 'Consulta Nutricional', 'Cuidados Preventivos', 'Cuidados com Pets Idosos'],
    },
]

export function ConditionsSection() {
    return (
        <section className="relative py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-[var(--primary)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Condições Comuns que Tratamos
                </motion.h2>
                <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {commonConditions.map((item, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="text-lg md:text-xl text-[var(--primary)]">
                                        {item.category}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <motion.ul
                                        className="space-y-2.5"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        {item.conditions.map((condition, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="flex items-center text-[var(--text-secondary)] text-sm"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                            >
                                                <motion.span
                                                    className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mr-2.5 shrink-0"
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + (idx * 0.1) }}
                                                />
                                                {condition}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
} 
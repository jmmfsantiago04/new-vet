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
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-[var(--primary)]">
                    Condições Comuns que Tratamos
                </h2>
                <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {commonConditions.map((item, index) => (
                        <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl text-[var(--primary)]">
                                    {item.category}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2.5">
                                    {item.conditions.map((condition, idx) => (
                                        <li key={idx} className="flex items-center text-[var(--text-secondary)] text-sm">
                                            <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mr-2.5 shrink-0"></span>
                                            {condition}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
} 
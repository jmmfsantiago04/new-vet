import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    isActive: boolean;
}

interface FaqCategory {
    id: number;
    category: string;
    items: FaqItem[];
}

interface FaqContentProps {
    categories: FaqCategory[];
}

export default function FaqContent({ categories }: FaqContentProps) {
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="shadow-xl border-t-4 border-t-[var(--primary)]">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex justify-center">
                            <Badge variant="default" className="bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 text-sm px-4 py-1">
                                FAQ
                            </Badge>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">
                            Perguntas Frequentes
                        </CardTitle>
                        <CardDescription className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                            Encontre respostas rápidas para as dúvidas mais comuns sobre nossos serviços veterinários online
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-8">
                            {categories.map((category) => (
                                <div key={category.id} className="space-y-4">
                                    <h3 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
                                        {category.category}
                                    </h3>
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.items
                                            .filter(item => item.isActive)
                                            .map((item) => (
                                                <AccordionItem
                                                    key={item.id}
                                                    value={`item-${item.id}`}
                                                    className="border-b border-gray-200 last:border-0"
                                                >
                                                    <AccordionTrigger className="text-[var(--primary)] hover:text-[var(--primary)]/90 text-left hover:no-underline">
                                                        {item.question}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-[var(--text-secondary)] leading-relaxed">
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Decorative elements */}
                <div className="mt-12 flex justify-center space-x-8 opacity-50">
                    <span className="w-12 h-12 text-3xl animate-bounce-slow">🐾</span>
                    <span className="w-12 h-12 text-3xl animate-bounce-slow delay-150">🐾</span>
                    <span className="w-12 h-12 text-3xl animate-bounce-slow delay-300">🐾</span>
                </div>
            </div>
        </section>
    )
} 
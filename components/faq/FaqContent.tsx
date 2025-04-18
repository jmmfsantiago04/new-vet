import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import * as motion from "motion/react-client"
import { Suspense } from "react"

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

function FaqSkeleton() {
    return (
        <Card className="shadow-xl border-t-4 border-t-[var(--primary)]">
            <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                    <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-8">
                    {[1, 2, 3].map((category) => (
                        <div key={category} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="border-b border-gray-200 last:border-0 py-4">
                                        <Skeleton className="h-6 w-full max-w-lg mb-2" />
                                        <Skeleton className="h-4 w-full max-w-xl" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default function FaqContent({ categories }: FaqContentProps) {
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense fallback={<FaqSkeleton />}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="shadow-xl border-t-4 border-t-[var(--primary)]">
                            <CardHeader className="text-center space-y-4">
                                <motion.div
                                    className="flex justify-center"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Badge variant="default" className="bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 text-sm px-4 py-1">
                                        FAQ
                                    </Badge>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <CardTitle className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">
                                        Perguntas Frequentes
                                    </CardTitle>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <CardDescription className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                                        Encontre respostas rápidas para as dúvidas mais comuns sobre nossos serviços veterinários online
                                    </CardDescription>
                                </motion.div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-8">
                                    {categories.map((category, categoryIndex) => (
                                        <motion.div
                                            key={category.id}
                                            className="space-y-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                                        >
                                            <motion.h3
                                                className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
                                            >
                                                <motion.span
                                                    className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: 0.3 + categoryIndex * 0.1 }}
                                                ></motion.span>
                                                {category.category}
                                            </motion.h3>
                                            <Accordion type="single" collapsible className="w-full">
                                                {category.items
                                                    .filter(item => item.isActive)
                                                    .map((item, itemIndex) => (
                                                        <motion.div
                                                            key={item.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.5, delay: 0.4 + (categoryIndex * 0.1) + (itemIndex * 0.1) }}
                                                        >
                                                            <AccordionItem
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
                                                        </motion.div>
                                                    ))}
                                            </Accordion>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Decorative elements with motion */}
                    <motion.div
                        className="mt-12 flex justify-center space-x-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 0.5, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        {[0, 1, 2].map((index) => (
                            <motion.span
                                key={index}
                                className="w-12 h-12 text-3xl"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.3,
                                    ease: "easeInOut",
                                    opacity: {
                                        duration: 0.6,
                                        delay: 0.7 + index * 0.2,
                                    },
                                    scale: {
                                        duration: 0.6,
                                        delay: 0.7 + index * 0.2,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10
                                    }
                                }}
                            >
                                🐾
                            </motion.span>
                        ))}
                    </motion.div>
                </Suspense>
            </div>
        </section>
    )
} 
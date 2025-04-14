import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const faqItems = [
    {
        category: "Consultas",
        items: [
            {
                question: "Como funciona a consulta online?",
                answer: "As consultas online são realizadas através de videochamada. Você agenda um horário conveniente, recebe um link para a consulta e se conecta com nosso veterinário no horário marcado. Durante a consulta, você pode mostrar seu pet, descrever sintomas e receber orientações profissionais."
            },
            {
                question: "Quais tipos de casos podem ser atendidos online?",
                answer: "Consultas online são ideais para avaliações comportamentais, dúvidas sobre nutrição, acompanhamento de tratamentos, orientações gerais de saúde e avaliação inicial de sintomas leves. Casos de emergência ou que necessitem de exame físico direto devem ser atendidos presencialmente."
            }
        ]
    },
    {
        category: "Agendamento e Preços",
        items: [
            {
                question: "Como faço para agendar uma consulta?",
                answer: "Para agendar uma consulta, você pode criar uma conta em nossa plataforma, escolher o tipo de atendimento desejado (vídeo consulta ou chat) e selecionar um horário disponível. O pagamento é feito de forma segura online, e você receberá a confirmação por e-mail."
            },
            {
                question: "Qual o valor das consultas?",
                answer: "Os valores variam de acordo com o tipo de atendimento. Consultas por vídeo custam R$120, suporte por chat 24h custa R$60, e atendimento emergencial tem valor de R$180. Aceitamos diferentes formas de pagamento e oferecemos pacotes com desconto para acompanhamento contínuo."
            }
        ]
    },
    {
        category: "Emergências e Medicamentos",
        items: [
            {
                question: "Vocês atendem emergências?",
                answer: "Sim, oferecemos atendimento emergencial 24/7 através de nossa plataforma. No entanto, em casos graves que necessitem de intervenção imediata, recomendamos procurar uma clínica veterinária presencial."
            },
            {
                question: "Como recebo a prescrição de medicamentos?",
                answer: "Após a consulta, quando necessário, o veterinário enviará a prescrição digital diretamente para seu e-mail. A prescrição é válida e pode ser utilizada em qualquer farmácia veterinária."
            }
        ]
    }
]

export default function FaqContent() {
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
                            {faqItems.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="space-y-4">
                                    <h3 className="text-lg font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
                                        {category.category}
                                    </h3>
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.items.map((item, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`item-${categoryIndex}-${index}`}
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
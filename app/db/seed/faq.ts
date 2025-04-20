
import { db } from '@/app/db';
import { faqCategoriesTable, faqItemsTable } from '@/app/db/schema';

export async function seedFaq() {
    try {
        // First, clear existing data
        await db.delete(faqItemsTable);
        await db.delete(faqCategoriesTable);

        // Seed categories
        const categories = await db.insert(faqCategoriesTable)
            .values([
                { category: 'Consultas', order: 0 },
                { category: 'Agendamento e Preços', order: 1 },
                { category: 'Emergências e Medicamentos', order: 2 },
            ])
            .returning();

        // Create a map of category names to IDs
        const categoryMap = new Map(categories.map(cat => [cat.category, cat.id]));

        // Seed items
        await db.insert(faqItemsTable)
            .values([
                {
                    categoryId: categoryMap.get('Consultas')!,
                    question: 'Como funciona a consulta online?',
                    answer: 'As consultas online são realizadas através de videochamada. Você agenda um horário conveniente, recebe um link para a consulta e se conecta com nosso veterinário no horário marcado. Durante a consulta, você pode mostrar seu pet, descrever sintomas e receber orientações profissionais.',
                    order: 0,
                    isActive: true
                },
                {
                    categoryId: categoryMap.get('Consultas')!,
                    question: 'Quais tipos de casos podem ser atendidos online?',
                    answer: 'Consultas online são ideais para avaliações comportamentais, dúvidas sobre nutrição, acompanhamento de tratamentos, orientações gerais de saúde e avaliação inicial de sintomas leves. Casos de emergência ou que necessitem de exame físico direto devem ser atendidos presencialmente.',
                    order: 1,
                    isActive: true
                },
                {
                    categoryId: categoryMap.get('Agendamento e Preços')!,
                    question: 'Como faço para agendar uma consulta?',
                    answer: 'Para agendar uma consulta, você pode criar uma conta em nossa plataforma, escolher o tipo de atendimento desejado (vídeo consulta ou chat) e selecionar um horário disponível. O pagamento é feito de forma segura online, e você receberá a confirmação por e-mail.',
                    order: 0,
                    isActive: true
                },
                {
                    categoryId: categoryMap.get('Agendamento e Preços')!,
                    question: 'Qual o valor das consultas?',
                    answer: 'Os valores variam de acordo com o tipo de atendimento. Consultas por vídeo custam R$120, suporte por chat 24h custa R$60, e atendimento emergencial tem valor de R$180. Aceitamos diferentes formas de pagamento e oferecemos pacotes com desconto para acompanhamento contínuo.',
                    order: 1,
                    isActive: true
                },
                {
                    categoryId: categoryMap.get('Emergências e Medicamentos')!,
                    question: 'Vocês atendem emergências?',
                    answer: 'Sim, oferecemos atendimento emergencial 24/7 através de nossa plataforma. No entanto, em casos graves que necessitem de intervenção imediata, recomendamos procurar uma clínica veterinária presencial.',
                    order: 0,
                    isActive: true
                },
                {
                    categoryId: categoryMap.get('Emergências e Medicamentos')!,
                    question: 'Como recebo a prescrição de medicamentos?',
                    answer: 'Após a consulta, quando necessário, o veterinário enviará a prescrição digital diretamente para seu e-mail. A prescrição é válida e pode ser utilizada em qualquer farmácia veterinária.',
                    order: 1,
                    isActive: true
                },
            ]);

        console.log('✅ FAQ data seeded successfully');
    } catch (error) {
        console.error('Error seeding FAQ data:', error);
        throw error;
    }
} 
import { db } from '@/app/db';
import { blogCategoriesTable, blogPostsTable } from '@/app/db/schema';

export async function seedBlog() {
    try {
        // First, clear existing data
        await db.delete(blogPostsTable);
        await db.delete(blogCategoriesTable);

        // Seed categories
        const categories = await db.insert(blogCategoriesTable)
            .values([
                { name: 'Cuidados Gerais', slug: 'cuidados-gerais' },
                { name: 'Emergências', slug: 'emergencias' },
                { name: 'Telemedicina', slug: 'telemedicina' },
                { name: 'Nutrição', slug: 'nutricao' },
                { name: 'Saúde', slug: 'saude' },
                { name: 'Comportamento', slug: 'comportamento' },
            ])
            .returning();

        // Create a map of category names to IDs
        const categoryMap = new Map(categories.map(cat => [cat.name, cat.id]));

        // Seed posts
        await db.insert(blogPostsTable)
            .values([
                {
                    slug: "cuidados-basicos-com-pets",
                    title: "10 Cuidados Básicos que Todo Pet Precisa",
                    summary: "Descubra os cuidados essenciais para manter seu pet saudável e feliz, desde a alimentação adequada até a importância das visitas regulares ao veterinário.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...", // Add full content here
                    imageUrl: "/blog/pet-care.jpg",
                    categoryId: categoryMap.get('Cuidados Gerais')!,
                    publishedAt: new Date('2024-03-15'),
                    isPublished: true,
                },
                {
                    slug: "sinais-emergencia-veterinaria",
                    title: "Sinais de Emergência: Quando Procurar um Veterinário",
                    summary: "Aprenda a identificar sinais que indicam que seu pet precisa de atendimento veterinário urgente e saiba como agir em situações de emergência.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    imageUrl: "/blog/emergency.jpg",
                    categoryId: categoryMap.get('Emergências')!,
                    publishedAt: new Date('2024-03-10'),
                    isPublished: true,
                },
                {
                    slug: "beneficios-consulta-online",
                    title: "Benefícios da Consulta Veterinária Online",
                    summary: "Conheça as vantagens de realizar consultas veterinárias online e como esse serviço pode facilitar o cuidado com seu pet no conforto de casa.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    imageUrl: "/blog/online-vet.jpg",
                    categoryId: categoryMap.get('Telemedicina')!,
                    publishedAt: new Date('2024-03-05'),
                    isPublished: true,
                },
                {
                    slug: "alimentacao-saudavel-pets",
                    title: "Guia de Alimentação Saudável para Pets",
                    summary: "Um guia completo sobre a alimentação adequada para cães e gatos, incluindo dicas sobre escolha de ração e alimentos naturais seguros.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    imageUrl: "/blog/pet-food.jpg",
                    categoryId: categoryMap.get('Nutrição')!,
                    publishedAt: new Date('2024-03-01'),
                    isPublished: true,
                },
                {
                    slug: "prevencao-doencas-comuns",
                    title: "Prevenção de Doenças Comuns em Pets",
                    summary: "Saiba como prevenir as doenças mais comuns em cães e gatos através de cuidados preventivos e check-ups regulares.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    imageUrl: "/blog/prevention.jpg",
                    categoryId: categoryMap.get('Saúde')!,
                    publishedAt: new Date('2024-02-25'),
                    isPublished: true,
                },
                {
                    slug: "comportamento-animal",
                    title: "Entendendo o Comportamento do seu Pet",
                    summary: "Aprenda a interpretar os sinais e comportamentos do seu pet para melhorar sua comunicação e fortalecer o vínculo entre vocês.",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    imageUrl: "/blog/behavior.jpg",
                    categoryId: categoryMap.get('Comportamento')!,
                    publishedAt: new Date('2024-02-20'),
                    isPublished: true,
                },
            ]);

        console.log('✅ Blog data seeded successfully');
    } catch (error) {
        console.error('Error seeding blog data:', error);
        throw error;
    }
} 
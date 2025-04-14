import { db } from '@/app/db';
import { faqCategoriesTable, faqItemsTable } from '@/app/db/schema';
import FAQTable from '@/components/admin/FAQTable';
import FAQCreate from '@/components/admin/FAQCreate';

export default async function FAQAdminPage() {
    // Fetch categories and items
    const categories = await db.select().from(faqCategoriesTable).orderBy(faqCategoriesTable.order);
    const items = await db.select().from(faqItemsTable).orderBy(faqItemsTable.order);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Gerenciar FAQ</h1>
                <p className="text-muted-foreground">
                    Gerencie as categorias e perguntas frequentes do site
                </p>
            </div>

            <div className="space-y-8">
                <FAQCreate categories={categories} />
                <FAQTable categories={categories} items={items} />
            </div>
        </div>
    );
} 
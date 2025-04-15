import { db } from '@/app/db';
import { faqCategoriesTable, faqItemsTable } from '@/app/db/schema';
import FAQTable from '@/components/admin/FAQTable';
import FAQCreate from '@/components/admin/FAQCreate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ListFilter } from "lucide-react";

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

            <Tabs defaultValue="list" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="list" className="flex items-center gap-2">
                        <ListFilter className="h-4 w-4" />
                        <span>Lista de Perguntas</span>
                    </TabsTrigger>
                    <TabsTrigger value="create" className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        <span>Criar Pergunta</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-4">
                    <FAQTable categories={categories} items={items} />
                </TabsContent>

                <TabsContent value="create" className="space-y-4">
                    <FAQCreate categories={categories} />
                </TabsContent>
            </Tabs>
        </div>
    );
} 
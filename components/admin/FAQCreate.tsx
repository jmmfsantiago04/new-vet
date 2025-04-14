'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createFaqCategory, createFaqItem } from '@/app/actions/faq';
import { insertFaqCategorySchema, insertFaqItemSchema } from '@/app/db/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CategoryFormData = {
    category: string;
};

type ItemFormData = {
    categoryId: number;
    question: string;
    answer: string;
};

interface FAQCreateProps {
    categories: Array<{ id: number; category: string }>;
}

export default function FAQCreate({ categories }: FAQCreateProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Category Form
    const categoryForm = useForm<CategoryFormData>({
        resolver: zodResolver(insertFaqCategorySchema.pick({ category: true })),
        defaultValues: {
            category: '',
        },
    });

    // Item Form
    const itemForm = useForm<ItemFormData>({
        resolver: zodResolver(insertFaqItemSchema.pick({ categoryId: true, question: true, answer: true })),
        defaultValues: {
            categoryId: undefined,
            question: '',
            answer: '',
        },
    });

    const onCategorySubmit = async (data: CategoryFormData) => {
        try {
            setIsSubmitting(true);
            const result = await createFaqCategory(data);

            if (result.success) {
                toast.success('Categoria criada com sucesso!');
                categoryForm.reset();
            } else {
                toast.error(result.error || 'Erro ao criar categoria');
            }
        } catch (error) {
            toast.error('Erro ao criar categoria');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onItemSubmit = async (data: ItemFormData) => {
        try {
            setIsSubmitting(true);
            const result = await createFaqItem(data);

            if (result.success) {
                toast.success('Pergunta criada com sucesso!');
                itemForm.reset();
            } else {
                toast.error(result.error || 'Erro ao criar pergunta');
            }
        } catch (error) {
            toast.error('Erro ao criar pergunta');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[var(--primary)]">
                    Gerenciar FAQ
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="category" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="category">Nova Categoria</TabsTrigger>
                        <TabsTrigger value="item" disabled={categories.length === 0}>
                            Nova Pergunta
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="category">
                        <Form {...categoryForm}>
                            <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
                                <FormField
                                    control={categoryForm.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome da Categoria</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Consultas" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Criando...' : 'Criar Categoria'}
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>

                    <TabsContent value="item">
                        <Form {...itemForm}>
                            <form onSubmit={itemForm.handleSubmit(onItemSubmit)} className="space-y-4">
                                <FormField
                                    control={itemForm.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categoria</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                defaultValue={field.value?.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione uma categoria" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id.toString()}
                                                        >
                                                            {category.category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={itemForm.control}
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pergunta</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite a pergunta" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={itemForm.control}
                                    name="answer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resposta</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Digite a resposta"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Criando...' : 'Criar Pergunta'}
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
} 
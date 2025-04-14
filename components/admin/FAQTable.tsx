'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    updateFaqCategory,
    updateFaqItem,
    deleteFaqCategory,
    deleteFaqItem,
    toggleFaqItemActive,
    reorderFaqCategory,
    reorderFaqItem,
} from '@/app/actions/faq';
import { insertFaqCategorySchema, insertFaqItemSchema } from '@/app/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Category {
    id: number;
    category: string;
    order: number;
}

interface Item {
    id: number;
    categoryId: number;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
}

interface FAQTableProps {
    categories: Category[];
    items: Item[];
}

type EditCategoryFormData = {
    category: string;
};

type EditItemFormData = {
    categoryId: number;
    question: string;
    answer: string;
};

export default function FAQTable({ categories, items }: FAQTableProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    const categoryForm = useForm<EditCategoryFormData>({
        resolver: zodResolver(insertFaqCategorySchema.pick({ category: true })),
        defaultValues: {
            category: '',
        },
    });

    const itemForm = useForm<EditItemFormData>({
        resolver: zodResolver(insertFaqItemSchema.pick({ categoryId: true, question: true, answer: true })),
        defaultValues: {
            categoryId: undefined,
            question: '',
            answer: '',
        },
    });

    const handleEditCategory = async (data: EditCategoryFormData) => {
        if (!editingCategory) return;

        try {
            setIsSubmitting(true);
            const result = await updateFaqCategory(editingCategory.id, data);

            if (result.success) {
                toast.success('Categoria atualizada com sucesso!');
                setEditingCategory(null);
            } else {
                toast.error(result.error || 'Erro ao atualizar categoria');
            }
        } catch (error) {
            toast.error('Erro ao atualizar categoria');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditItem = async (data: EditItemFormData) => {
        if (!editingItem) return;

        try {
            setIsSubmitting(true);
            const result = await updateFaqItem(editingItem.id, data);

            if (result.success) {
                toast.success('Pergunta atualizada com sucesso!');
                setEditingItem(null);
            } else {
                toast.error(result.error || 'Erro ao atualizar pergunta');
            }
        } catch (error) {
            toast.error('Erro ao atualizar pergunta');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta categoria? Todas as perguntas relacionadas serão excluídas.')) {
            return;
        }

        try {
            const result = await deleteFaqCategory(id);
            if (result.success) {
                toast.success('Categoria excluída com sucesso!');
            } else {
                toast.error(result.error || 'Erro ao excluir categoria');
            }
        } catch (error) {
            toast.error('Erro ao excluir categoria');
            console.error(error);
        }
    };

    const handleDeleteItem = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta pergunta?')) {
            return;
        }

        try {
            const result = await deleteFaqItem(id);
            if (result.success) {
                toast.success('Pergunta excluída com sucesso!');
            } else {
                toast.error(result.error || 'Erro ao excluir pergunta');
            }
        } catch (error) {
            toast.error('Erro ao excluir pergunta');
            console.error(error);
        }
    };

    const handleToggleActive = async (id: number) => {
        try {
            const result = await toggleFaqItemActive(id);
            if (result.success) {
                toast.success('Status atualizado com sucesso!');
            } else {
                toast.error(result.error || 'Erro ao atualizar status');
            }
        } catch (error) {
            toast.error('Erro ao atualizar status');
            console.error(error);
        }
    };

    const handleMoveCategory = async (id: number, direction: 'up' | 'down') => {
        const category = categories.find(c => c.id === id);
        if (!category) return;

        const newOrder = direction === 'up' ? category.order - 1 : category.order + 1;
        if (newOrder < 0 || newOrder >= categories.length) return;

        try {
            const result = await reorderFaqCategory(id, newOrder);
            if (result.success) {
                toast.success('Ordem atualizada com sucesso!');
            } else {
                toast.error(result.error || 'Erro ao atualizar ordem');
            }
        } catch (error) {
            toast.error('Erro ao atualizar ordem');
            console.error(error);
        }
    };

    const handleMoveItem = async (id: number, categoryId: number, direction: 'up' | 'down') => {
        const categoryItems = items.filter(i => i.categoryId === categoryId);
        const item = categoryItems.find(i => i.id === id);
        if (!item) return;

        const newOrder = direction === 'up' ? item.order - 1 : item.order + 1;
        if (newOrder < 0 || newOrder >= categoryItems.length) return;

        try {
            const result = await reorderFaqItem(id, categoryId, newOrder);
            if (result.success) {
                toast.success('Ordem atualizada com sucesso!');
            } else {
                toast.error(result.error || 'Erro ao atualizar ordem');
            }
        } catch (error) {
            toast.error('Erro ao atualizar ordem');
            console.error(error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {categories.map((category) => (
                        <div key={category.id} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-[var(--primary)]">
                                        {category.category}
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleMoveCategory(category.id, 'up')}
                                            disabled={category.order === 0}
                                        >
                                            ↑
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleMoveCategory(category.id, 'down')}
                                            disabled={category.order === categories.length - 1}
                                        >
                                            ↓
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Dialog onOpenChange={(open) => {
                                        if (open) {
                                            setEditingCategory(category);
                                            categoryForm.reset({ category: category.category });
                                        }
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Editar Categoria</DialogTitle>
                                            </DialogHeader>
                                            <Form {...categoryForm}>
                                                <form onSubmit={categoryForm.handleSubmit(handleEditCategory)} className="space-y-4">
                                                    <FormField
                                                        control={categoryForm.control}
                                                        name="category"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Nome da Categoria</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button type="submit" disabled={isSubmitting}>
                                                        {isSubmitting ? 'Salvando...' : 'Salvar'}
                                                    </Button>
                                                </form>
                                            </Form>
                                        </DialogContent>
                                    </Dialog>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ordem</TableHead>
                                        <TableHead>Pergunta</TableHead>
                                        <TableHead>Resposta</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items
                                        .filter(item => item.categoryId === category.id)
                                        .sort((a, b) => a.order - b.order)
                                        .map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="w-[100px]">
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleMoveItem(item.id, category.id, 'up')}
                                                            disabled={item.order === 0}
                                                        >
                                                            ↑
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleMoveItem(item.id, category.id, 'down')}
                                                            disabled={item.order === items.filter(i => i.categoryId === category.id).length - 1}
                                                        >
                                                            ↓
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{item.question}</TableCell>
                                                <TableCell className="max-w-[300px] truncate">
                                                    {item.answer}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={item.isActive ? "default" : "secondary"}
                                                        className="cursor-pointer"
                                                        onClick={() => handleToggleActive(item.id)}
                                                    >
                                                        {item.isActive ? 'Ativo' : 'Inativo'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Dialog onOpenChange={(open) => {
                                                            if (open) {
                                                                setEditingItem(item);
                                                                itemForm.reset({
                                                                    categoryId: item.categoryId,
                                                                    question: item.question,
                                                                    answer: item.answer,
                                                                });
                                                            }
                                                        }}>
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Editar Pergunta</DialogTitle>
                                                                </DialogHeader>
                                                                <Form {...itemForm}>
                                                                    <form onSubmit={itemForm.handleSubmit(handleEditItem)} className="space-y-4">
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
                                                                                            {categories.map((cat) => (
                                                                                                <SelectItem
                                                                                                    key={cat.id}
                                                                                                    value={cat.id.toString()}
                                                                                                >
                                                                                                    {cat.category}
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
                                                                                        <Input {...field} />
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
                                                                                            className="min-h-[100px]"
                                                                                            {...field}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                        <Button type="submit" disabled={isSubmitting}>
                                                                            {isSubmitting ? 'Salvando...' : 'Salvar'}
                                                                        </Button>
                                                                    </form>
                                                                </Form>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteItem(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 
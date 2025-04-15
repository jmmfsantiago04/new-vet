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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { updateBlogPost, deleteBlogPost, toggleBlogPostPublished } from '@/app/actions/blog';
import { insertBlogPostSchema } from '@/app/db/schema';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string;
    isPublished: boolean;
    publishedAt: Date;
    categoryId: number;
    category: string;
}

interface Category {
    id: number;
    name: string;
}

interface BlogTableProps {
    posts: BlogPost[];
    categories: Category[];
}

type EditPostFormData = {
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
    categoryId: number;
};

export default function BlogTable({ posts, categories }: BlogTableProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    const form = useForm<EditPostFormData>({
        resolver: zodResolver(insertBlogPostSchema.pick({
            title: true,
            slug: true,
            summary: true,
            content: true,
            imageUrl: true,
            categoryId: true
        })),
        defaultValues: {
            title: '',
            slug: '',
            summary: '',
            content: '',
            imageUrl: '',
            categoryId: undefined,
        },
    });

    const handleEdit = async (data: EditPostFormData) => {
        if (!editingPost) return;

        try {
            setIsSubmitting(true);
            const result = await updateBlogPost(editingPost.id, data);

            if (result.success) {
                toast.success('Post atualizado com sucesso!');
                setEditingPost(null);
            } else {
                toast.error(result.error || 'Erro ao atualizar post');
            }
        } catch (error) {
            toast.error('Erro ao atualizar post');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este post?')) {
            return;
        }

        try {
            const result = await deleteBlogPost(id);
            if (result.success) {
                toast.success('Post excluído com sucesso!');
            } else {
                toast.error(result.error || 'Erro ao excluir post');
            }
        } catch (error) {
            toast.error('Erro ao excluir post');
            console.error(error);
        }
    };

    const handleTogglePublished = async (id: number) => {
        try {
            const result = await toggleBlogPostPublished(id);
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

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Posts do Blog</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data de Publicação</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>{post.category}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={post.isPublished ? "default" : "secondary"}
                                        className="cursor-pointer"
                                        onClick={() => handleTogglePublished(post.id)}
                                    >
                                        {post.isPublished ? 'Publicado' : 'Rascunho'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pt-BR') : '-'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Dialog onOpenChange={(open) => {
                                            if (open) {
                                                setEditingPost(post);
                                                form.reset({
                                                    title: post.title,
                                                    slug: post.slug,
                                                    summary: post.summary,
                                                    imageUrl: post.imageUrl,
                                                    categoryId: post.categoryId,
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
                                                    <DialogTitle>Editar Post</DialogTitle>
                                                </DialogHeader>
                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
                                                        <FormField
                                                            control={form.control}
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
                                                                                    {category.name}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="title"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Título</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                field.onChange(e);
                                                                                const slug = generateSlug(e.target.value);
                                                                                form.setValue('slug', slug);
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="slug"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Slug</FormLabel>
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="summary"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Resumo</FormLabel>
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

                                                        <FormField
                                                            control={form.control}
                                                            name="content"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Conteúdo</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            className="min-h-[200px]"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="imageUrl"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>URL da Imagem</FormLabel>
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
                                            onClick={() => handleTogglePublished(post.id)}
                                        >
                                            {post.isPublished ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
} 
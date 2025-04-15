'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createBlogPost, createBlogCategory } from '@/app/actions/blog';
import { insertBlogPostSchema, insertBlogCategorySchema } from '@/app/db/schema';
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

type BlogPostFormData = {
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
    categoryId: number;
};

type CategoryFormData = {
    name: string;
    slug: string;
};

interface BlogCreateProps {
    categories: Array<{ id: number; name: string }>;
}

export default function BlogCreate({ categories }: BlogCreateProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Post Form
    const postForm = useForm<BlogPostFormData>({
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

    // Category Form
    const categoryForm = useForm<CategoryFormData>({
        resolver: zodResolver(insertBlogCategorySchema.pick({
            name: true,
            slug: true
        })),
        defaultValues: {
            name: '',
            slug: '',
        },
    });

    const onPostSubmit = async (data: BlogPostFormData) => {
        try {
            setIsSubmitting(true);
            const result = await createBlogPost({
                ...data,
                publishedAt: new Date(),
                isPublished: false,
            });

            if (result.success) {
                toast.success('Post criado com sucesso!');
                postForm.reset();
            } else {
                toast.error(result.error || 'Erro ao criar post');
            }
        } catch (error) {
            toast.error('Erro ao criar post');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onCategorySubmit = async (data: CategoryFormData) => {
        try {
            setIsSubmitting(true);
            const result = await createBlogCategory(data);

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

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[var(--primary)]">
                    Gerenciar Blog
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="post" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="post">Novo Post</TabsTrigger>
                        <TabsTrigger value="category">Nova Categoria</TabsTrigger>
                    </TabsList>

                    <TabsContent value="post">
                        <Form {...postForm}>
                            <form onSubmit={postForm.handleSubmit(onPostSubmit)} className="space-y-4">
                                <FormField
                                    control={postForm.control}
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
                                    control={postForm.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Título</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Digite o título do post"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        const slug = generateSlug(e.target.value);
                                                        postForm.setValue('slug', slug);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={postForm.control}
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
                                    control={postForm.control}
                                    name="summary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resumo</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Digite um breve resumo do post"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={postForm.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Conteúdo</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Digite o conteúdo do post"
                                                    className="min-h-[200px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={postForm.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL da Imagem</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://exemplo.com/imagem.jpg"
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
                                    {isSubmitting ? 'Criando...' : 'Criar Post'}
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>

                    <TabsContent value="category">
                        <Form {...categoryForm}>
                            <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
                                <FormField
                                    control={categoryForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome da Categoria</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: Saúde Pet"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        const slug = generateSlug(e.target.value);
                                                        categoryForm.setValue('slug', slug);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={categoryForm.control}
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
                </Tabs>
            </CardContent>
        </Card>
    );
} 
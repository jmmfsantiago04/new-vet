'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpInput } from '@/app/db/schema';
import { signUp } from '@/app/actions/auth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SignUpForm() {
    const [isPending, startTransition] = useTransition();
    const form = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: SignUpInput) => {
        startTransition(async () => {
            try {
                await signUp(data);
                form.reset();
                // You can add a success notification or redirect here
            } catch (error) {
                if (error instanceof Error) {
                    form.setError('root', { message: error.message });
                } else {
                    form.setError('root', { message: 'Algo deu errado' });
                }
            }
        });
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Criar uma Conta</CardTitle>
                <CardDescription>
                    Cadastre-se para acessar serviços veterinários para seus pets
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {form.formState.errors.root && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg text-sm">
                                {form.formState.errors.root.message}
                            </div>
                        )}

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Digite seu e-mail"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Crie uma senha"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirme sua senha"
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
                            disabled={isPending}
                        >
                            {isPending ? 'Criando conta...' : 'Cadastrar'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
} 
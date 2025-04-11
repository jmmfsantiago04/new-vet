'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInInput } from '@/app/db/schema';
import { signIn } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

export default function LoginForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: SignInInput) => {
        startTransition(async () => {
            try {
                const result = await signIn(data);
                if (result.user) {
                    toast.success('Login realizado com sucesso!');
                    form.reset();
                    // Redirect based on user role
                    if (result.user.role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/cliente/dashboard');
                    }
                }
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error('Credenciais inválidas');
                }
            }
        });
    };

    return (
        <Card className="w-[95%] max-w-md mx-auto shadow-lg">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl sm:text-3xl font-bold">Entrar</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                    Acesse sua conta para gerenciar seus pets
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                        {form.formState.errors.root && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 sm:p-4 rounded-lg text-sm sm:text-base">
                                {form.formState.errors.root.message}
                            </div>
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2 sm:space-y-3">
                                    <FormLabel className="text-sm sm:text-base">E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Digite seu e-mail"
                                            className="w-full text-sm sm:text-base p-2 sm:p-3"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs sm:text-sm" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2 sm:space-y-3">
                                    <FormLabel className="text-sm sm:text-base">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Digite sua senha"
                                            className="w-full text-sm sm:text-base p-2 sm:p-3"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs sm:text-sm" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full mt-6 text-sm sm:text-base py-5 sm:py-6"
                            disabled={isPending}
                            size="lg"
                        >
                            {isPending ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
} 
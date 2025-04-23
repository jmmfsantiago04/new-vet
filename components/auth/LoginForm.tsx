'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInInput } from '@/app/db/schema';
import { signIn } from 'next-auth/react';
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
import GoogleSignInButton from './GoogleSignInButton';

export default function LoginForm() {
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
                await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    callbackUrl: "/cliente/dashboard",
                });
            } catch (err) {
                console.error("Error signing in:", err);
                toast.error("Erro ao fazer login. Verifique suas credenciais.");
            }
        });
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center py-8 px-4">
            <Card className="w-[95%] max-w-md shadow-lg">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl sm:text-3xl font-bold">Entrar</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        Acesse sua conta para gerenciar seus pets
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <GoogleSignInButton />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">
                                Ou continue com e-mail
                            </span>
                        </div>
                    </div>

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
        </div>
    );
} 
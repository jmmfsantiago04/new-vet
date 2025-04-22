'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpInput } from '@/app/db/schema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as z from "zod";

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

// Brazilian phone regex: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

const signUpFormSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phone: z.string().regex(phoneRegex, {
        message: "Número de telefone inválido. Use o formato: (71) 99999-9999",
    }),
    password: z.string().min(6, {
        message: "Senha deve ter pelo menos 6 caracteres.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirmação de senha deve ter pelo menos 6 caracteres.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

function formatPhoneNumber(value: string) {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format according to the number of digits
    if (digits.length <= 2) {
        return digits.replace(/(\d{1,2})/, "($1");
    } else if (digits.length <= 6) {
        return digits.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    } else if (digits.length <= 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
        return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").slice(0, 15);
    }
}

export default function SignUpForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: SignUpFormValues) => {
        startTransition(async () => {
            try {
                const result = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    phone: data.phone,
                    callbackUrl: '/cliente/dashboard',
                    redirect: false,
                    isSignUp: true
                });

                if (result?.error) {
                    toast.error(result.error);
                    return;
                }

                toast.success('Conta criada com sucesso!');
                form.reset();
                router.push('/cliente/dashboard');
            } catch (error) {
                toast.error('Erro ao criar conta');
            }
        });
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center py-8 px-4">
            <Card className="w-full max-w-md shadow-lg">
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
                                name="phone"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="(71) 99999-9999"
                                                {...field}
                                                onChange={(e) => {
                                                    const formatted = formatPhoneNumber(e.target.value);
                                                    e.target.value = formatted;
                                                    onChange(e);
                                                }}
                                                maxLength={15}
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
        </div>
    );
} 
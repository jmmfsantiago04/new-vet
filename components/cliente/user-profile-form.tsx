'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { updateUser } from "@/app/actions/users"
import { changePassword } from "@/app/actions/change-password"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"

// Brazilian phone regex: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/

const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phone: z.string().regex(phoneRegex, {
        message: "Número de telefone inválido. Use o formato: (71) 99999-9999",
    }),
})

const passwordFormSchema = z.object({
    currentPassword: z.string().min(6, {
        message: "Senha atual deve ter pelo menos 6 caracteres.",
    }),
    newPassword: z.string().min(6, {
        message: "Nova senha deve ter pelo menos 6 caracteres.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirmação de senha deve ter pelo menos 6 caracteres.",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

interface UserProfileFormProps {
    user: {
        id: number
        name: string
        email: string
        phone: string
    }
}

function formatPhoneNumber(value: string) {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format according to the number of digits
    if (digits.length <= 2) {
        return digits.replace(/(\d{1,2})/, "($1")
    } else if (digits.length <= 6) {
        return digits.replace(/(\d{2})(\d{0,4})/, "($1) $2")
    } else if (digits.length <= 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    } else {
        return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").slice(0, 15)
    }
}

export function UserProfileForm({ user }: UserProfileFormProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    if (status === "loading") {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    async function onProfileSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        try {
            const result = await updateUser(user.id, data)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Perfil atualizado com sucesso!")
            }
        } catch (err) {
            console.error("Error updating profile:", err)
            toast.error("Erro ao atualizar perfil. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    async function onPasswordSubmit(data: PasswordFormValues) {
        setIsLoading(true)
        try {
            const result = await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            })

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Senha atualizada com sucesso!")
                passwordForm.reset()
            }
        } catch (err) {
            console.error("Error updating password:", err)
            toast.error("Erro ao atualizar senha. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>
                        Atualize suas informações pessoais aqui.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                            <FormField
                                control={profileForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Seu nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="seu@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileForm.control}
                                name="phone"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="(71) 99999-9999"
                                                {...field}
                                                onChange={(e) => {
                                                    const formatted = formatPhoneNumber(e.target.value)
                                                    e.target.value = formatted
                                                    onChange(e)
                                                }}
                                                maxLength={15}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Atualizando..." : "Atualizar Perfil"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                        Atualize sua senha de acesso aqui.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha Atual</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nova Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Nova Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Atualizando..." : "Atualizar Senha"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
} 
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransition } from 'react';
import { addPet } from '@/app/actions/pets';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function PetForm() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Carregando...</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    if (!session) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl text-[var(--text-primary)]">Acesso Restrito</CardTitle>
                    <CardDescription className="text-[var(--text-secondary)]">
                        Você precisa estar logado para adicionar um pet
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await addPet(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Pet adicionado com sucesso!');
                formRef.current?.reset();
            }
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Adicionar Novo Pet</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                    Insira as informações do seu pet abaixo
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm sm:text-base font-medium">
                                Nome do Pet
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Digite o nome do pet"
                                className="w-full"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="species" className="text-sm sm:text-base font-medium">
                                Espécie
                            </Label>
                            <Select name="species" required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione a espécie" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="dog">Cachorro</SelectItem>
                                    <SelectItem value="cat">Gato</SelectItem>
                                    <SelectItem value="bird">Pássaro</SelectItem>
                                    <SelectItem value="other">Outro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="breed" className="text-sm sm:text-base font-medium">
                                Raça
                            </Label>
                            <Input
                                id="breed"
                                name="breed"
                                placeholder="Digite a raça"
                                className="w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-sm sm:text-base font-medium">
                                    Idade
                                </Label>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    placeholder="Idade"
                                    min="0"
                                    max="50"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="weight" className="text-sm sm:text-base font-medium">
                                    Peso (kg)
                                </Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    placeholder="Peso"
                                    min="0"
                                    max="200"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 col-span-full">
                            <Label htmlFor="medicalHistory" className="text-sm sm:text-base font-medium">
                                Histórico Médico
                            </Label>
                            <Textarea
                                id="medicalHistory"
                                name="medicalHistory"
                                placeholder="Digite o histórico médico"
                                className="min-h-[120px] resize-y w-full"
                            />
                        </div>

                        <div className="flex justify-end pt-4 sm:pt-6 col-span-full">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto sm:min-w-[200px]"
                                disabled={isPending}
                                size="lg"
                            >
                                {isPending ? 'Salvando...' : 'Adicionar Pet'}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
} 
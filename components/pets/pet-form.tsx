'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransition } from 'react';
import { addPet } from '@/app/pets/actions';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function PetForm() {
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await addPet(formData);
            if (result.error) {
                setError(result.error);
            } else {
                formRef.current?.reset();
            }
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Adicionar Novo Pet</CardTitle>
                <CardDescription>Insira as informações do pet e do proprietário abaixo</CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Nome do Pet</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Digite o nome do pet"
                                    className="w-full"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="species" className="text-sm font-medium">Espécie</Label>
                                <Select name="species" required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione a espécie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dog">Cachorro</SelectItem>
                                        <SelectItem value="cat">Gato</SelectItem>
                                        <SelectItem value="bird">Pássaro</SelectItem>
                                        <SelectItem value="other">Outro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="breed" className="text-sm font-medium">Raça</Label>
                                <Input
                                    id="breed"
                                    name="breed"
                                    placeholder="Digite a raça"
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="age" className="text-sm font-medium">Idade</Label>
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
                                    <Label htmlFor="weight" className="text-sm font-medium">Peso (kg)</Label>
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
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-4">Informações do Proprietário</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="ownerName" className="text-sm font-medium">Nome do Proprietário</Label>
                                    <Input
                                        id="ownerName"
                                        name="ownerName"
                                        placeholder="Digite o nome do proprietário"
                                        className="w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ownerPhone" className="text-sm font-medium">Telefone</Label>
                                    <Input
                                        id="ownerPhone"
                                        name="ownerPhone"
                                        placeholder="+55999999999"
                                        pattern="^\+?[1-9]\d{1,14}$"
                                        title="Por favor, insira um número de telefone válido começando com + seguido do código do país e número"
                                        className="w-full"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Formato: +CódigoPaísNúmero (ex: +5571999999999)</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="medicalHistory" className="text-sm font-medium">Histórico Médico</Label>
                            <Textarea
                                id="medicalHistory"
                                name="medicalHistory"
                                placeholder="Digite o histórico médico"
                                className="min-h-[120px] resize-y"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto min-w-[200px]"
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
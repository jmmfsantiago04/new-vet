'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import { deletePet } from "@/app/actions/pets";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { PetDialog } from './pet-dialog';

interface Pet {
    id: number;
    name: string;
    species: string;
    breed: string | null;
    age: number | null;
    weight: number | null;
    medicalHistory: string | null;
    createdAt: Date;
    userId: number;
}

interface PetUserTableProps {
    pets: Pet[];
}

export function PetUserTable({ pets }: PetUserTableProps) {
    const [isPending, startTransition] = useTransition();
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    const handleDelete = (id: number) => {
        const formData = new FormData();
        formData.append('id', id.toString());
        startTransition(() => {
            deletePet(formData);
        });
    };

    const getSpeciesLabel = (species: string) => {
        const speciesMap: Record<string, string> = {
            dog: 'Cachorro',
            cat: 'Gato',
            bird: 'Pássaro',
            other: 'Outro'
        };
        return speciesMap[species] || 'Outro';
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Meus Pets</CardTitle>
                    <CardDescription>
                        {pets.length} {pets.length === 1 ? 'pet cadastrado' : 'pets cadastrados'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold">Nome</TableHead>
                                        <TableHead className="font-semibold">Espécie</TableHead>
                                        <TableHead className="font-semibold hidden md:table-cell">Raça</TableHead>
                                        <TableHead className="font-semibold hidden sm:table-cell">Idade</TableHead>
                                        <TableHead className="font-semibold hidden sm:table-cell">Peso (kg)</TableHead>
                                        <TableHead className="font-semibold hidden lg:table-cell">Cadastrado em</TableHead>
                                        <TableHead className="font-semibold text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pets.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                                                Você ainda não tem pets cadastrados. Adicione seu primeiro pet usando o formulário acima.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        pets.map((pet) => (
                                            <TableRow
                                                key={pet.id}
                                                className="hover:bg-muted/50 cursor-pointer"
                                                onClick={() => setSelectedPet(pet)}
                                            >
                                                <TableCell className="font-medium max-w-[150px] truncate">
                                                    {pet.name}
                                                </TableCell>
                                                <TableCell>
                                                    {getSpeciesLabel(pet.species)}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {pet.breed || '-'}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {pet.age ? `${pet.age} anos` : '-'}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    {pet.weight ? `${pet.weight} kg` : '-'}
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell text-muted-foreground">
                                                    {format(new Date(pet.createdAt), "d 'de' MMM 'de' yyyy", { locale: ptBR })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(pet.id);
                                                        }}
                                                        disabled={isPending}
                                                        className="hover:bg-red-600"
                                                    >
                                                        {isPending ? 'Excluindo...' : 'Excluir'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <PetDialog
                pet={selectedPet}
                isOpen={!!selectedPet}
                onClose={() => setSelectedPet(null)}
            />
        </>
    );
} 
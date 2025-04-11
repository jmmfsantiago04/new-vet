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
import { Skeleton } from "@/components/ui/skeleton";

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
    isLoading?: boolean;
}

export function PetUserTable({ pets, isLoading = false }: PetUserTableProps) {
    const [isPending, startTransition] = useTransition();
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    const handleDelete = (id: number) => {
        startTransition(() => {
            deletePet(id);
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

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-24" />
                    </CardTitle>
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
                                    {[...Array(5)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[100px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[80px]" />
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Skeleton className="h-4 w-[100px]" />
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Skeleton className="h-4 w-[40px]" />
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Skeleton className="h-4 w-[60px]" />
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <Skeleton className="h-4 w-[100px]" />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Skeleton className="h-8 w-[70px] ml-auto" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Meus Pets</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        {pets.length} {pets.length === 1 ? 'pet cadastrado' : 'pets cadastrados'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold text-sm sm:text-base">Nome</TableHead>
                                        <TableHead className="font-semibold text-sm sm:text-base">Espécie</TableHead>
                                        <TableHead className="font-semibold text-sm sm:text-base hidden md:table-cell">Raça</TableHead>
                                        <TableHead className="font-semibold text-sm sm:text-base hidden sm:table-cell">Idade</TableHead>
                                        <TableHead className="font-semibold text-sm sm:text-base hidden sm:table-cell">Peso (kg)</TableHead>
                                        <TableHead className="font-semibold text-sm sm:text-base hidden lg:table-cell">Cadastrado em</TableHead>
                                        <TableHead className="font-semibold text-sm sm:text-base text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pets.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground py-10 text-sm sm:text-base">
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
                                                <TableCell className="font-medium max-w-[150px] truncate text-sm sm:text-base">
                                                    {pet.name}
                                                    <div className="md:hidden">
                                                        <span className="text-xs sm:text-sm text-muted-foreground block">
                                                            {getSpeciesLabel(pet.species)}
                                                            {pet.breed && ` - ${pet.breed}`}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm sm:text-base">
                                                    {getSpeciesLabel(pet.species)}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-sm sm:text-base">
                                                    {pet.breed || '-'}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-sm sm:text-base">
                                                    {pet.age ? `${pet.age} anos` : '-'}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-sm sm:text-base">
                                                    {pet.weight ? `${pet.weight} kg` : '-'}
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell text-muted-foreground text-sm sm:text-base">
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
                                                        className="hover:bg-red-600 text-sm sm:text-base"
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
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
import { useTransition } from "react";
import { deletePet } from "@/app/pets/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";

interface Pet {
    id: number;
    name: string;
    species: string;
    breed: string | null;
    age: number | null;
    weight: number | null;
    ownerName: string;
    ownerPhone: string;
    medicalHistory: string | null;
    createdAt: Date;
}

interface PetsTableProps {
    pets: Pet[];
}

export function PetsTable({ pets }: PetsTableProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: number) => {
        const formData = new FormData();
        formData.append('id', id.toString());
        startTransition(() => {
            deletePet(formData);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pet List</CardTitle>
                <CardDescription>
                    {pets.length} {pets.length === 1 ? 'pet' : 'pets'} registered
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">Name</TableHead>
                                    <TableHead className="font-semibold">Species</TableHead>
                                    <TableHead className="font-semibold hidden md:table-cell">Breed</TableHead>
                                    <TableHead className="font-semibold hidden sm:table-cell">Age</TableHead>
                                    <TableHead className="font-semibold hidden sm:table-cell">Weight (kg)</TableHead>
                                    <TableHead className="font-semibold">Owner</TableHead>
                                    <TableHead className="font-semibold hidden md:table-cell">Phone</TableHead>
                                    <TableHead className="font-semibold hidden lg:table-cell">Added</TableHead>
                                    <TableHead className="font-semibold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pets.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center text-muted-foreground py-10">
                                            No pets found. Add your first pet using the form above.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pets.map((pet) => (
                                        <TableRow key={pet.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium max-w-[150px] truncate">
                                                {pet.name}
                                            </TableCell>
                                            <TableCell>{pet.species}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {pet.breed || '-'}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {pet.age || '-'}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {pet.weight || '-'}
                                            </TableCell>
                                            <TableCell className="max-w-[150px] truncate">
                                                {pet.ownerName}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {pet.ownerPhone}
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell text-muted-foreground">
                                                {format(new Date(pet.createdAt), 'MMM d, yyyy')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(pet.id)}
                                                    disabled={isPending}
                                                    className="hover:bg-red-600"
                                                >
                                                    {isPending ? 'Deleting...' : 'Delete'}
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
    );
} 
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
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updatePet, deletePet } from "@/app/actions/pets";
import { useRouter } from "next/navigation";
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
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

interface AdminPetTableProps {
    pets: Pet[];
    isLoading?: boolean;
}

export function AdminPetTable({ pets, isLoading = false }: AdminPetTableProps) {
    const router = useRouter();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editedPet, setEditedPet] = useState<Pet | null>(null);
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

    const handleEdit = (pet: Pet) => {
        setEditedPet(pet);
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setSelectedPetId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedPetId) return;
        try {
            await deletePet(selectedPetId);
            setIsDeleteDialogOpen(false);
            toast.success("Pet excluído com sucesso!");
            router.refresh();
        } catch (err) {
            console.error("Error deleting pet:", err);
            toast.error("Erro ao excluir pet");
        }
    };

    const handleUpdatePet = async () => {
        if (!editedPet) return;

        try {
            await updatePet({
                id: editedPet.id,
                name: editedPet.name,
                species: editedPet.species,
                breed: editedPet.breed,
                age: editedPet.age,
                weight: editedPet.weight,
                medicalHistory: editedPet.medicalHistory,
            });
            setIsEditDialogOpen(false);
            toast.success("Pet atualizado com sucesso!");
        } catch (err) {
            console.error("Error updating pet:", err);
            toast.error("Erro ao atualizar pet");
        }
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
                    <CardTitle><Skeleton className="h-8 w-[100px]" /></CardTitle>
                    <CardDescription>
                        <Skeleton className="h-4 w-[250px]" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[120px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[150px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array(5).fill(0).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-[150px] mb-2" />
                                            <Skeleton className="h-4 w-[150px]" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Skeleton className="h-8 w-[60px]" />
                                                <Skeleton className="h-8 w-[60px]" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Pets</CardTitle>
                    <CardDescription>
                        Gerenciar pets cadastrados no sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead className="hidden sm:table-cell">Espécie</TableHead>
                                    <TableHead className="hidden md:table-cell">Raça</TableHead>
                                    <TableHead className="hidden lg:table-cell">Idade</TableHead>
                                    <TableHead className="hidden lg:table-cell">Peso</TableHead>
                                    <TableHead className="hidden md:table-cell">Dono</TableHead>
                                    <TableHead className="hidden sm:table-cell">Contato</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pets.map((pet) => (
                                    <TableRow key={pet.id}>
                                        <TableCell>
                                            {pet.name}
                                            <div className="sm:hidden">
                                                <span className="text-sm text-muted-foreground block">
                                                    {getSpeciesLabel(pet.species)}
                                                    {pet.breed && ` - ${pet.breed}`}
                                                </span>
                                            </div>
                                            <div className="md:hidden mt-1">
                                                <span className="text-sm text-muted-foreground block">
                                                    {pet.user.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{getSpeciesLabel(pet.species)}</TableCell>
                                        <TableCell className="hidden md:table-cell">{pet.breed || "-"}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{pet.age ? `${pet.age} anos` : "-"}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{pet.weight ? `${pet.weight}kg` : "-"}</TableCell>
                                        <TableCell className="hidden md:table-cell">{pet.user.name}</TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {pet.user.phone}
                                            <br />
                                            {pet.user.email}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(pet)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(pet.id)}
                                                >
                                                    Excluir
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Pet</DialogTitle>
                        <DialogDescription>
                            Atualize as informações do pet abaixo.
                        </DialogDescription>
                    </DialogHeader>
                    {editedPet && (
                        <div className="grid gap-4 py-4">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                value={editedPet.name}
                                onChange={(e) =>
                                    setEditedPet({ ...editedPet, name: e.target.value })
                                }
                            />
                            <Label htmlFor="species">Espécie</Label>
                            <Input
                                id="species"
                                value={editedPet.species}
                                onChange={(e) =>
                                    setEditedPet({ ...editedPet, species: e.target.value })
                                }
                            />
                            <Label htmlFor="breed">Raça</Label>
                            <Input
                                id="breed"
                                value={editedPet.breed || ""}
                                onChange={(e) =>
                                    setEditedPet({ ...editedPet, breed: e.target.value })
                                }
                            />
                            <Label htmlFor="age">Idade</Label>
                            <Input
                                id="age"
                                type="number"
                                value={editedPet.age || ""}
                                onChange={(e) =>
                                    setEditedPet({
                                        ...editedPet,
                                        age: e.target.value ? parseInt(e.target.value) : null,
                                    })
                                }
                            />
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                value={editedPet.weight || ""}
                                onChange={(e) =>
                                    setEditedPet({
                                        ...editedPet,
                                        weight: e.target.value ? parseInt(e.target.value) : null,
                                    })
                                }
                            />
                            <Label htmlFor="medicalHistory">Histórico Médico</Label>
                            <Textarea
                                id="medicalHistory"
                                value={editedPet.medicalHistory || ""}
                                onChange={(e) =>
                                    setEditedPet({
                                        ...editedPet,
                                        medicalHistory: e.target.value,
                                    })
                                }
                            />
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleUpdatePet}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir este pet? Esta ação não pode ser
                            desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
} 
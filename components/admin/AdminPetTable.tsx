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
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updatePet, deletePet } from "@/app/actions/pets";
import { useRouter } from "next/navigation";

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
}

export function AdminPetTable({ pets }: AdminPetTableProps) {
    const router = useRouter();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editedPet, setEditedPet] = useState<Pet | null>(null);
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

    const handleEdit = (pet: Pet) => {
        setEditedPet(pet);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        setSelectedPetId(id);
        setIsDeleteDialogOpen(true);
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
        } catch (error) {
            toast.error("Erro ao atualizar pet");
        }
    };

    const handleDeletePet = async () => {
        if (!selectedPetId) return;

        try {
            await deletePet(selectedPetId);
            setIsDeleteDialogOpen(false);
            toast.success("Pet excluído com sucesso!");
        } catch (error) {
            toast.error("Erro ao excluir pet");
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
                                    <TableHead>Espécie</TableHead>
                                    <TableHead>Raça</TableHead>
                                    <TableHead>Idade</TableHead>
                                    <TableHead>Peso</TableHead>
                                    <TableHead>Dono</TableHead>
                                    <TableHead>Contato</TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pets.map((pet) => (
                                    <TableRow key={pet.id}>
                                        <TableCell>{pet.name}</TableCell>
                                        <TableCell>{getSpeciesLabel(pet.species)}</TableCell>
                                        <TableCell>{pet.breed || "-"}</TableCell>
                                        <TableCell>{pet.age ? `${pet.age} anos` : "-"}</TableCell>
                                        <TableCell>{pet.weight ? `${pet.weight}kg` : "-"}</TableCell>
                                        <TableCell>{pet.user.name}</TableCell>
                                        <TableCell>
                                            {pet.user.phone}
                                            <br />
                                            {pet.user.email}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => handleEdit(pet)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(pet.id)}
                                            >
                                                Excluir
                                            </Button>
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
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    value={editedPet.name}
                                    onChange={(e) =>
                                        setEditedPet({ ...editedPet, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="species">Espécie</Label>
                                <Input
                                    id="species"
                                    value={editedPet.species}
                                    onChange={(e) =>
                                        setEditedPet({ ...editedPet, species: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="breed">Raça</Label>
                                <Input
                                    id="breed"
                                    value={editedPet.breed || ""}
                                    onChange={(e) =>
                                        setEditedPet({ ...editedPet, breed: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
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
                            </div>
                            <div className="grid gap-2">
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
                            </div>
                            <div className="grid gap-2">
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
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDeletePet}>
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
} 
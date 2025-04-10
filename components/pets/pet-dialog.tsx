'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

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

interface PetDialogProps {
    pet: Pet | null;
    isOpen: boolean;
    onClose: () => void;
}

const getSpeciesLabel = (species: string) => {
    const speciesMap: Record<string, string> = {
        dog: 'Cachorro',
        cat: 'Gato',
        bird: 'Pássaro',
        other: 'Outro'
    };
    return speciesMap[species] || 'Outro';
};

export function PetDialog({ pet, isOpen, onClose }: PetDialogProps) {
    if (!pet) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{pet.name}</DialogTitle>
                    <DialogDescription>
                        Cadastrado em {format(new Date(pet.createdAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium mb-1">Espécie</h4>
                            <p className="text-muted-foreground">{getSpeciesLabel(pet.species)}</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1">Raça</h4>
                            <p className="text-muted-foreground">{pet.breed || 'Não informada'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1">Idade</h4>
                            <p className="text-muted-foreground">{pet.age ? `${pet.age} anos` : 'Não informada'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1">Peso</h4>
                            <p className="text-muted-foreground">{pet.weight ? `${pet.weight} kg` : 'Não informado'}</p>
                        </div>
                    </div>
                    {pet.medicalHistory && (
                        <div>
                            <h4 className="font-medium mb-2">Histórico Médico</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap">{pet.medicalHistory}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 
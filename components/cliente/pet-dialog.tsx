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
            <DialogContent className="sm:max-w-[500px] w-[95vw] p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl">{pet.name}</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">
                        Cadastrado em {format(new Date(pet.createdAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2 sm:py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium mb-1 text-sm sm:text-base">Espécie</h4>
                            <p className="text-muted-foreground text-sm sm:text-base">{getSpeciesLabel(pet.species)}</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1 text-sm sm:text-base">Raça</h4>
                            <p className="text-muted-foreground text-sm sm:text-base">{pet.breed || 'Não informada'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1 text-sm sm:text-base">Idade</h4>
                            <p className="text-muted-foreground text-sm sm:text-base">{pet.age ? `${pet.age} anos` : 'Não informada'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1 text-sm sm:text-base">Peso</h4>
                            <p className="text-muted-foreground text-sm sm:text-base">{pet.weight ? `${pet.weight} kg` : 'Não informado'}</p>
                        </div>
                    </div>
                    {pet.medicalHistory && (
                        <div>
                            <h4 className="font-medium mb-2 text-sm sm:text-base">Histórico Médico</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap text-sm sm:text-base bg-muted/50 p-3 rounded-md">
                                {pet.medicalHistory}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 
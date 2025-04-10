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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateAppointmentStatus } from "@/app/actions/appointments";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface Appointment {
    id: number;
    date: string;
    time: string;
    status: string;
    createdAt: Date | null;
    userId: number;
    petId: number;
    pet: {
        id: number;
        name: string;
        species: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
    };
}

interface AdminAppointmentTableProps {
    appointments: Appointment[];
}

export function AdminAppointmentTable({ appointments }: AdminAppointmentTableProps) {
    const router = useRouter();
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [newStatus, setNewStatus] = useState<string>("");

    const handleUpdateStatus = async () => {
        if (!selectedAppointment || !newStatus) return;

        try {
            await updateAppointmentStatus(selectedAppointment.id, newStatus);
            toast.success("Status da consulta atualizado com sucesso!");
            setIsStatusDialogOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("Erro ao atualizar status da consulta");
        }
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
            confirmed: "bg-blue-100 text-blue-800 hover:bg-blue-200",
            done: "bg-green-100 text-green-800 hover:bg-green-200",
            cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
        } as const;

        const statusLabels = {
            pending: "Pendente",
            confirmed: "Confirmada",
            done: "Realizada",
            cancelled: "Cancelada",
        } as const;

        return (
            <Badge
                className={statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"}
                variant="outline"
            >
                {statusLabels[status as keyof typeof statusLabels] || status}
            </Badge>
        );
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
                    <CardTitle>Consultas</CardTitle>
                    <CardDescription>
                        Gerenciar consultas agendadas
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Horário</TableHead>
                                    <TableHead>Pet</TableHead>
                                    <TableHead>Tutor</TableHead>
                                    <TableHead>Contato</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell>
                                            {format(new Date(appointment.date), "dd/MM/yyyy")}
                                        </TableCell>
                                        <TableCell>{appointment.time}</TableCell>
                                        <TableCell>
                                            {appointment.pet.name}
                                            <br />
                                            <span className="text-sm text-muted-foreground">
                                                {getSpeciesLabel(appointment.pet.species)}
                                            </span>
                                        </TableCell>
                                        <TableCell>{appointment.user.name}</TableCell>
                                        <TableCell>
                                            {appointment.user.phone}
                                            <br />
                                            <span className="text-sm text-muted-foreground">
                                                {appointment.user.email}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(appointment.status)}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedAppointment(appointment);
                                                    setNewStatus(appointment.status);
                                                    setIsStatusDialogOpen(true);
                                                }}
                                            >
                                                Alterar Status
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Alterar Status da Consulta</DialogTitle>
                        <DialogDescription>
                            Atualize o status da consulta abaixo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Select
                                value={newStatus}
                                onValueChange={setNewStatus}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="confirmed">Confirmada</SelectItem>
                                    <SelectItem value="done">Realizada</SelectItem>
                                    <SelectItem value="cancelled">Cancelada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleUpdateStatus}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
} 
'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Appointment {
    id: number;
    date: string;
    time: string;
    status: string;
    pet: {
        id: number;
        name: string;
        species: string;
    };
}

interface AppointmentUserTableProps {
    appointments: Appointment[];
    isLoading?: boolean;
}

export function AppointmentUserTable({ appointments, isLoading = false }: AppointmentUserTableProps) {
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

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-8 w-[200px]" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-[300px]" /></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[120px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array(3).fill(0).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
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
        <Card>
            <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Minhas Consultas</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                    {appointments.length} {appointments.length === 1 ? 'consulta agendada' : 'consultas agendadas'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold text-sm sm:text-base">Data</TableHead>
                                    <TableHead className="font-semibold text-sm sm:text-base">Horário</TableHead>
                                    <TableHead className="font-semibold text-sm sm:text-base">Pet</TableHead>
                                    <TableHead className="font-semibold text-sm sm:text-base">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center text-muted-foreground py-10 text-sm sm:text-base"
                                        >
                                            Você ainda não tem consultas agendadas.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    appointments.map((appointment) => (
                                        <TableRow key={appointment.id} className="hover:bg-muted/50">
                                            <TableCell className="text-sm sm:text-base">
                                                {format(new Date(appointment.date), "dd/MM/yyyy")}
                                            </TableCell>
                                            <TableCell className="text-sm sm:text-base">
                                                {appointment.time}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <span className="font-medium text-sm sm:text-base">
                                                        {appointment.pet.name}
                                                    </span>
                                                    <span className="text-xs sm:text-sm text-muted-foreground block">
                                                        {getSpeciesLabel(appointment.pet.species)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(appointment.status)}
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
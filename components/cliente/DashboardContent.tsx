'use client';

import { PetForm } from '@/components/cliente/pet-form';
import { PetUserTable } from '@/components/cliente/pet-user-table';
import { AppointmentUserTable } from '@/components/cliente/AppointmentUserTable';
import SignOutButton from '@/components/auth/SignOutButton';
import { AppointmentUserForm } from '@/components/cliente/appointment-user-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Calendar } from "lucide-react";

interface DashboardContentProps {
    userName: string;
    userPets: any[];
    userAppointments: any[];
}

export function DashboardContent({ userName, userPets, userAppointments }: DashboardContentProps) {
    // Format pets for the appointment form
    const petsForAppointment = userPets.map(pet => ({
        id: pet.id,
        name: pet.name
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-[var(--primary)]">
                            Olá, {userName}! 👋
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Gerencie seus pets e acompanhe seus atendimentos
                        </p>
                    </div>
                    <SignOutButton />
                </div>

                <Tabs defaultValue="pets" className="w-full">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="pets" className="flex-1 sm:flex-initial">
                            <PawPrint className="size-4 sm:mr-2" />
                            <span className="hidden sm:inline">Meus Pets</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="appointments"
                            className="flex-1 sm:flex-initial"
                            disabled={userPets.length === 0}
                        >
                            <Calendar className="size-4 sm:mr-2" />
                            <span className="hidden sm:inline">Consultas</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pets" className="space-y-8 mt-6">
                        <section>
                            <PetForm />
                        </section>

                        <section>
                            <PetUserTable pets={userPets} />
                        </section>
                    </TabsContent>

                    <TabsContent value="appointments" className="space-y-8 mt-6">
                        {userPets.length > 0 ? (
                            <>
                                <section>
                                    <AppointmentUserForm pets={petsForAppointment} />
                                </section>
                                <section>
                                    <AppointmentUserTable appointments={userAppointments} />
                                </section>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-lg text-muted-foreground">
                                    Você precisa cadastrar um pet primeiro para agendar consultas.
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 
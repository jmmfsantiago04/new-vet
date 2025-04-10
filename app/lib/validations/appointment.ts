import { z } from 'zod';

export const appointmentSchema = z.object({
    petId: z.string({
        required_error: "Por favor, selecione um pet",
    }),
    date: z.date({
        required_error: "Por favor, selecione uma data",
    }),
    time: z.string({
        required_error: "Por favor, selecione um horário",
    }).regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "Horário inválido. Use o formato HH:MM",
    }),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>; 
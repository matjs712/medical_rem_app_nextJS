'use server'

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { RegistersSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import * as z from 'zod'

export const addRegister = async (values: any
    // z.infer<typeof RegistersSchema>
    ) => {

    const { remediesId, start_at, lapsus, time } = values;
    let timeToMinutes = lapsus;

    if(!remediesId) return { error: "Debes seleccionar una medicina!" }
    if(!start_at) return { error: "Debes ingresar una fecha de início!" }
    if(!lapsus) return { error: "Debes ingresar cada cuanto tiempo quieres tomar tu medicina!" }
    if(!time) return { error: "Debes seleccionar horas o minutos!" }

    const user = await currentUser();

    if(!user) return { error: "No se encontró al usuario" }

    const medicine = db.remedies.findUnique({
        where: { id: remediesId }
    })

    if(!medicine) return { error: "No se encontró la medicina" }


    if(time == 'hrs'){
        timeToMinutes = lapsus * 2;
    }
    const newValues = { ...values, userId: user.id, lapsus: timeToMinutes, start_at: new Date(start_at) }
    
    await db.registers.create({
        data: newValues
    })
    revalidatePath('/dashboard');
    return { success:"Registro añadido con exito" }
}

export const updateStateRegister = async (id: string) => {

    const user = await currentUser();
    if(!user) return { error: "No se encontró al usuario" }

    const register = db.registers.findUnique({
        where: { id: id }
    })
    if(!register) return { error: "No se encontró el registro." }

    await db.registers.update({
        where: { id },
        data: {
            isCompleted: true
        }
    })

    revalidatePath('/dashboard');

    return { success: 'Tratamiento finalizado!' }
}
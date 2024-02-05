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


    // if(time == 'hrs'){
    //     timeToMinutes = lapsus * 2;
    // }
    const newValues = { ...values, userId: user.id, lapsus, start_at: new Date(start_at) }
    
    await db.registers.create({
        data: newValues
    })
    revalidatePath('/dashboard');
    return { success:"Registro añadido con exito" }
}

export const updateRegister = async (values: z.infer<typeof RegistersSchema>) => {
    
    const { id } = values;
    if(!id) return { error: "Debes seleccionar un medicamento!." }

    const user = await currentUser();
    if(!user) return { error: "No se encontró al usuario" }

    const register = db.registers.findUnique({
        where: { id: values.id }
    })
    if(!register) return { error: "No se encontró el registro." }


    await db.registers.update({
        where: { id },
        data: {
            userId:user.id,
            ...values
        }
    })

    revalidatePath('/dashboard');

    return { success: 'Tratamiento actualizado con éxito!' }
}
export const updateStateRegister = async (id: string) => {

    const user = await currentUser();
    if(!user) return { error: "No se encontró al usuario" }

    const register = await db.registers.findUnique({
        where: { id: id }
    })
    
    if(!register) return { error: "No se encontró el registro." }

    await db.registers.update({
        where: { id },
        data: {
            isCompleted: !register?.isCompleted
        }
    })

    revalidatePath('/dashboard');

    return { success: 'Tratamiento actualizado!' }
}

export const getRegister = async (id: string) => {

    const user = await currentUser();
    if(!user) return { error: "No se encontró al usuario" }

    const register = await db.registers.findUnique({
        where: { id: id },
        include: {
            remedies: true,
        },
    })
    
    if(!register) return { error: "No se encontró el registro." }
    
    return register;

}
export const DeleteRegister = async (id: string) => {

    const user = await currentUser();
    if(!user) return { error: "No se encontró al usuario" }

    const register = await db.registers.findUnique({
        where: { id: id }
    })
    
    if(!register) return { error: "No se encontró el registro." }

    await db.registers.delete({
        where: {
            id
        }
    })
    
    return { success: "Registro eliminado con exíto." };

}
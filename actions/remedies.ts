"use server";

import * as z from "zod";
import { revalidatePath } from 'next/cache'
import { MedicinesSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
// import { getData } from "@/data/remedios";


export const updateMedicine = async (values: z.infer<typeof MedicinesSchema>) => {
  const validatedFields = MedicinesSchema.safeParse(values);
  if (!validatedFields.success) {
      return { error: "Ups, algo ha salido mal, verifíca los datos o intenta nuevamente!" };
  }

  const existingUser = await currentUser();
  
  if (!existingUser) {
    return { error: "Usuario no encontrado!" };
}

  await db.remedies.update({
    where: { id: values.id },
    data: {
      ...values,
    }
  });

revalidatePath('/mis-medicamentos');
  
  return { success: "Medicina actualizada éxitosamente!" };
}

export const deleteMedicine = async (id: string) => {
  const medicine = db.remedies.findUnique({ where: { id } });
  if(!medicine) return { error: "Medicina no encontrada!" };
  console.log('medicina encontrada', id);

  const user = await currentUser();

  if(!user) return { error: "Usuario no encontrado!" };
  
  await db.registers.deleteMany({
    where: { remediesId: id },
  });

  await db.remedies.delete({ where: { id } });
  
  return { success: "Medicina eliminada éxitosamente!" };
}

export const addMedicine = async (values: any
  // z.infer<typeof MedicinesSchema>
  ) => {
  const validatedFields = MedicinesSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Campos incorrectos!" };
  }
  const user = await currentUser();
  
  if(!user) return { error: "No hay usuario!" };
  const newData = { ...values, userId: user.id }

  await db.remedies.create({
    data: {
      ...newData
    },
  });

  return { success: "Medicine añadida éxitosamente!" };
};
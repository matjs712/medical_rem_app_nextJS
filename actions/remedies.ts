"use server";

import * as z from "zod";
import { revalidatePath } from 'next/cache'
import { MedicinesSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DELETE } from "@/app/api/images/route";
import { del } from "@vercel/blob";
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

  if(!values.name) return { error: "El medicamento necesita un nombre!" };
  if(values.content && !values.unit) return { error: "Debes ingresar una unidad de medida!" };
  if(values.unit && !values.content) return { error: "Debes ingresar una cantidad!" };
  if(values.content && (values.content < 0 || values.content == 0)) return { error: "Debes ingresar una cantidad mayor que 0!" };

  await db.remedies.update({
    where: { id: values.id },
    data: {
      ...values,
    }
  });

revalidatePath('/mis-medicamentos');
  
  return { success: "Medicina actualizada éxitosamente!" };
}

export const deleteMedicine = async ({ id, url } : {id: string, url?: string}) => {
  const medicine = db.remedies.findUnique({ where: { id } });
  if(!medicine) return { error: "Medicina no encontrada!" };
  console.log('medicina encontrada', id);

  const user = await currentUser();

  if(!user) return { error: "Usuario no encontrado!" };
  
  if(url && url?.length > 0){
    await del(url);
  }

  await db.registers.deleteMany({
    where: { remediesId: id },
  });
  console.log(id);
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
  if(!values.name) return { error: "El medicamento necesita un nombre!" };
  if(values.content && !values.unit) return { error: "Debes ingresar una unidad de medida!" };
  if(values.unit && !values.content) return { error: "Debes ingresar una cantidad!" };
  if(values.content && (values.content < 0 || values.content == 0)) return { error: "Debes ingresar una cantidad mayor que 0!" };

  const user = await currentUser();
  
  if(!user) return { error: "No hay usuario!" };
  const newData = { ...values, userId: user.id }

  await db.remedies.create({
    data: {
      ...newData
    },
  });
  revalidatePath('/mis-medicamentos');
  return { success: "Medicina añadida éxitosamente!", redirect:true };
};
"use server";

import * as z from "zod";
import { revalidatePath } from 'next/cache'
import { MedicinesSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getData } from "@/data/remedios";


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
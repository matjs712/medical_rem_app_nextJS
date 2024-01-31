import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "La nueva contraseña es requerida!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "La contraseña es requerida!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Mínimo de 6 caracteres requeridos",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "El correo es requerido",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "El correo es requerido",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "El correo es requerido",
  }),
  password: z.string().min(6, {
    message: "Mínimo de 6 caracteres requeridos",
  }),
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
});
export const MedicinesSchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  content: z.optional(z.coerce.number())
  ,
  unit: z.optional(z.string())
  ,
  indications: z.optional(z.string())
  ,
  contraindications: z.optional(z.string())
  ,
  description: z.optional(z.string())
  ,
  type: z.optional(z.string())
  ,
  expires_at: z.optional(z.date().or(z.string()))
  ,
  img: z.optional(z.string())
  ,
  isImportant: z.optional(z.boolean()),

}).refine((data) => {
  if ((data.content !== undefined && data.unit === undefined)) {
    return { message: "Si se especifica el contenido total, también se debe especificar su unidad de medida." };
  }
  return true;
}).refine((data) => {
  if ((data.unit !== undefined && data.content === undefined)) {
    return { message: "Si se especifica su unidad de medida, también se debe especificar su contenido." };
  }
  return true;
});

'use client'

import React, { useState, useTransition } from "react"
import * as z from 'zod';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { useForm } from "react-hook-form"
  import { Badge } from "@/components/ui/badge"
import { Medicine } from "@/app/(protected)/_components/medicines_columns"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MedicinesSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateMedicine } from "@/actions/remedies";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { redirect } from 'next/navigation'
import { toast } from "sonner"

import { DotLoader } from "react-spinners";
const EditSheet: React.FC<{ medicine: Medicine }> = ({ medicine }) => {
    const [date, setDate] = React.useState<Date>()
    const [ isPending ,startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
  

    const form = useForm<z.infer<typeof MedicinesSchema>>({
        resolver: zodResolver(MedicinesSchema),
        defaultValues: {
          id: medicine.id,
          name: medicine.name || '',
          unit: medicine.unit || undefined,
          content: medicine.content || undefined,
          indications: medicine.indications || undefined,
          contraindications: medicine.contraindications ||undefined,
          description: medicine.description || undefined,
          type: medicine.type || undefined,
        //   expires_at: medicine.expires_at instanceof Date ? medicine.expires_at : (typeof medicine.expires_at === 'string' ? new Date(medicine.expires_at) : new Date()),
          img: medicine.img || undefined,
          isImportant: typeof medicine.isImportant === 'boolean' ? medicine.isImportant : false,
        },
      });
    
      const onSubmit = (values: z.infer<typeof MedicinesSchema>) => {
        
        startTransition(async ()=> {
            await updateMedicine(values).then((data) => {
                
                setSuccess(data?.success);


                
                if(data?.success){
                    toast.success(data?.success, {
                        description: `Se ha actualizado la medicina ${values.name} con éxito!`,
                        action: {
                          label: "Vísto",
                          onClick: () => console.log("Undo"),
                        },
                      })
                    redirect('/mis-medicamentos')
                    
                }else if(data?.error){
                    toast.error(data?.error, {
                        description: `Error al actualizar la medicina ${values.name}`,
                        action: {
                          label: "Vísto",
                          onClick: () => console.log("Undo"),
                        },
                      })
                }
            });
        })
      }

  return (
        <Sheet>
        <SheetTrigger className="text-sm pl-2">Editar</SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
                <SheetHeader>
                <SheetTitle>Estás a punto de editar los datos de </SheetTitle>
                <Badge variant="default" className="text-md">{medicine.name}</Badge>
                <SheetDescription>
                <p className="mb-6">Realizar esta acción podría tener consecuencias para tu bienestar. Asegúrate de verificar la información que estás a punto de actualizar.</p>
                <ScrollArea className="h-[600] sm:h-[400px] rounded-md border p-4">
                    <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                        >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Tramadol"
                                    disabled={isPending}
                                />
                                </FormControl>
                                <FormDescription />
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Medicamento utilizado para el alivio de síntomas asociados con resfriados y gripes, como congestión nasal, dolor de cabeza, fiebre y malestar general" {...field} className="h-[150px] resize-none" disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="indications"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Indicaciones</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Este medicamento se utiliza para aliviar los síntomas de la fiebre y el dolor asociados con diversas condiciones médicas, como resfriados, gripe, dolores musculares y dolor de cabeza." {...field} className="h-[130px] resize-none" disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contraindications"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Contraindicaciones</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="No debe utilizarse en personas con alergia conocida a alguno de los ingredientes del medicamento." {...field} className="h-[130px] resize-none" disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Contenido total</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="21" {...field} disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unit"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Unidad de medida</FormLabel>
                                <FormControl>
                                    <Input placeholder="gr" {...field} disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ansiolítico" {...field} disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="expires_at"
                            render={({field}) => (
                            <FormItem>
                                <FormLabel>Fecha de vencímiento</FormLabel>
                                <FormControl> 
                                  <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                            {...field}
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="img"
                            render={({field}) => (
                            <FormItem className="mt-2">
                                <FormLabel>Imagen</FormLabel>
                                <FormControl>
                                    <Input {...field} type="file" disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isImportant"
                            render={({field}) => (
                            <FormItem className="flex flex-col mt-4">
                                <div className="flex">
                                <FormControl>
                                    <Checkbox id="isImportant" checked={field.value} onCheckedChange={field.onChange} disabled={isPending}/>
                                </FormControl>
                                <label htmlFor="isImportant" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2">Medicamento importante</label>
                                </div>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        
                            { isPending ? <Button className="mt-2 w-full" type="submit" disabled={isPending}><DotLoader size={20} color="#ffffff"/></Button> : <Button className="mt-2 w-full" type="submit">Actualizar</Button> }
                        </form>
                    </Form>
                    </ScrollArea>
                </SheetDescription>

            </SheetHeader>

        </SheetContent> 
    </Sheet>
    

  )
}

export default EditSheet;
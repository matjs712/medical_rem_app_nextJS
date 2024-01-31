'use client'

import React, { useEffect, useRef, useState, useTransition } from "react"
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
import type { PutBlobResult } from '@vercel/blob';
import Datepicker from "tailwind-datepicker-react"
import { DotLoader } from "react-spinners";
import { uploadImage } from "@/hooks/useUploadImg";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";


const EditSheet: React.FC<{ medicine: Medicine }> = ({ medicine }) => {
    const [show, setShow] = useState<boolean>(false)
    const [ isPending ,startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    // const [imgUrl, setImgUrl] = useState('');
    const [date, setDate] = useState<Date | string>();

    const options = {
      title: "Fecha de expiración",
      autoHide: true,
      todayBtn: false,
      clearBtn: true,
      clearBtnText: "Limpiar",
      maxDate: new Date("2030-01-01"),
      minDate: new Date("1950-01-01"),
      theme: {
          background: "bg-white dark:bg-gray-800 text-black",
          todayBtn: "",
          clearBtn: "",
          icons: "",
          text: "",
          disabledText: "bg-gray-300",
          input: "",
          inputIcon: "",
          selected: "",
      },
      icons: {
          // () => ReactElement | JSX.Element
          prev: () => <span className="text-black">Anterior</span>,
          next: () => <span className="text-black">Siguiente</span>,
      },
      datepickerClassNames: "top-12",
      defaultDate: new Date(medicine.expires_at) || new Date("2022-01-01"),
      language: "es",
      disabledDates: [],
      weekDays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
      inputNameProp: "expires_at",
      inputIdProp: "expires_at",
      inputPlaceholderProp: "Selecciona una fecha",
      inputDateFormatProp: {
        day: "numeric" as "numeric" | "2-digit" | undefined,
        month: "long" as "numeric" | "long" | "2-digit" | "short" | "narrow" | undefined,
        year: "numeric" as "numeric" | "2-digit" | undefined,
      },
    }

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
          // expires_at: medicine.expires_at || new Date() || String,
          img: medicine.img || undefined,
          isImportant: typeof medicine.isImportant === 'boolean' ? medicine.isImportant : false,
        },
      });
      
      const handleClose = (state: boolean) => setShow(state);
      const handleChange = (selectedDate: Date) => {
        const expiresAt = selectedDate.toISOString();
        setDate(expiresAt);
      };

      const onSubmit = (values: z.infer<typeof MedicinesSchema>) => {
        // return;
        startTransition(async () => {
            try {
              if (!inputFileRef.current?.files) {
                throw new Error("No file selected");
              }
          
              const file = inputFileRef.current.files[0];

              if(file){
                console.log('form file', file);
              
                const imgUrl = await uploadImage({ file, url: medicine.img });
                
                const mappedValues = { ...values, img: imgUrl };
                
                const data = await updateMedicine(mappedValues);
                setSuccess(data?.success);
            
                if (data?.success) {
                  toast.success(data?.success, {
                    description: `Se ha actualizado la medicina ${values.name} con éxito!`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
                } else if (data?.error) {
                  toast.error(data?.error, {
                    description: `Error al actualizar la medicina ${values.name}`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }
              }else{
                const valuesWithDate = {...values, expires_at: date};
                const data = await updateMedicine(valuesWithDate);
                setSuccess(data?.success);
            
                if (data?.success) {
                  toast.success(data?.success, {
                    description: `Se ha actualizado la medicina ${values.name} con éxito!`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
                } else if (data?.error) {
                  toast.error(data?.error, {
                    description: `Error al actualizar la medicina ${values.name}`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }
              }
          
              
            } catch (error) {
              // Handle errors appropriately
              console.error('An error occurred:', error);
            } finally {
                redirect('/mis-medicamentos');
            }
          });
          
      }

  return (
        <Sheet>
        <SheetTrigger className="flex items-center gap-2 hover:bg-gray-300 w-full p-2 rounded-md">
          <CiEdit/>
          <span className="text-sm">Editar</span>
          </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 w-[100vw] left-0 sm:left-[auto] sm:w-3/4" >
            <SheetHeader className="w-full">
                <SheetTitle>Estás a punto de editar los datos de </SheetTitle>
                <Badge variant="default" className="text-md">{medicine.name}</Badge>
                <SheetDescription className="h-[80vh] overflow-scroll">
                <p className="mb-6">Realizar esta acción podría tener consecuencias para tu bienestar. Asegúrate de verificar la información que estás a punto de actualizar.</p>
                {/* <ScrollArea className="h-[600px] sm:h-[400px] rounded-md border p-4"> */}
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
                                    style={{ color:'black' }}
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
                                    <Textarea style={{ color:'black' }} placeholder="Medicamento utilizado para el alivio de síntomas asociados con resfriados y gripes, como congestión nasal, dolor de cabeza, fiebre y malestar general" {...field} className="h-[150px] resize-none" disabled={isPending}/>
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
                                    <Textarea style={{ color:'black' }} placeholder="Este medicamento se utiliza para aliviar los síntomas de la fiebre y el dolor asociados con diversas condiciones médicas, como resfriados, gripe, dolores musculares y dolor de cabeza." {...field} className="h-[130px] resize-none" disabled={isPending}/>
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
                                    <Textarea style={{ color:'black' }} placeholder="No debe utilizarse en personas con alergia conocida a alguno de los ingredientes del medicamento." {...field} className="h-[130px] resize-none" disabled={isPending}/>
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
                                <Input
                                    style={{ color:'black' }} type="number" placeholder="21" {...field} disabled={isPending}/>
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
                                    <Input
                                        style={{ color:'black' }} placeholder="gr" {...field} disabled={isPending}/>
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
                                    <Input
                                        style={{ color:'black' }} placeholder="Ansiolítico" {...field} disabled={isPending}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        {/* <FormField 
                            control={form.control}
                            name="expires_at"
                            render={({field}) => (
                            <FormItem> */}
                                <FormLabel className="block">Fecha de vencímiento</FormLabel>
                                {/* <FormControl>  */}
                                {/* <Input
                                  {...field}
                                  type="date"
                                  style={{ color: 'black' }}
                                  disabled={isPending}
                                  value={date || ''}
                                /> */}
                                <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} classNames='bg-white'/>
                                {/* </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem> */}
                            {/* )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="img"
                            render={({field}) => (
                            <FormItem className="mt-2">
                                <FormLabel>Imagen</FormLabel>
                                <FormControl>
                                    {/* <Input
                                        style={{ color:'black' }} {...field} type="file" disabled={isPending} ref={inputFileRef}/> */}
                                    <input style={{ color:'black' }} type="file" disabled={isPending} ref={inputFileRef}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        { medicine.img && <Image src={medicine.img} width={150} height={150} style={{ objectFit:'cover' }} alt={`${medicine.name}_img`}/> }

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
                    {/* </ScrollArea> */}
                </SheetDescription>

            </SheetHeader>

        </SheetContent> 
    </Sheet>
    

  )
}

export default EditSheet;
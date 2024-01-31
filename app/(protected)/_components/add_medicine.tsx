'use client'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { FaPlus } from "react-icons/fa"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from 'react-hook-form'
import { MedicinesSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRef, useState, useTransition } from 'react'
import DatePicker from 'tailwind-datepicker-react'
import { Textarea } from '@/components/ui/textarea'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { DotLoader } from 'react-spinners'
import { uploadImage } from '@/hooks/useUploadImg'
import { addMedicine } from '@/actions/remedies'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
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
  defaultDate: new Date(),
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
  background:"bg-white",
}
export default function AddMedicine() {

  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState<Date | string>();

  const form = useForm<z.infer<typeof MedicinesSchema>>({
    resolver: zodResolver(MedicinesSchema),
    defaultValues: {
      id: "",
      name: "",
      unit: "",
      content: 0,
      indications: "",
      contraindications: "",
      description:"",
      type:"",
      dosis: 0,
      expires_at: new Date(),
      img:"",
      isImportant: false,
    },
  });

  const handleClose = (state: boolean) => setShow(state);
  const handleChange = (selectedDate: Date) => {
    const expiresAt = selectedDate.toISOString();
    setDate(expiresAt);
  };

  const onSubmit = (values: z.infer<typeof MedicinesSchema>) => {
    startTransition( async ()=> {
        try {
          if (!inputFileRef.current?.files) throw new Error("No file selected");
            const file = inputFileRef.current.files[0];

            if(file){
              const imgUrl = await uploadImage({ file });
              const mappedValues = { ...values, img: imgUrl };
              
              addMedicine(mappedValues)
              .then((resp)=> {
                if(resp.success) {
                  setSuccess(resp.success);
                  toast.success(resp.success, {
                    description: `Se ha añadido la medicina ${values.name} con éxito!`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
              
                } else if(resp.error) {
                  toast.error(resp.error, {
                    description: `Error al intentar añadir la medicina ${values.name}`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }
            })
          } else {
            addMedicine(values)
              .then((resp)=> {
                if(resp.success) {
                  setSuccess(resp.success);
                  toast.success(resp.success, {
                    description: `Se ha añadido la medicina ${values.name} con éxito!`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
              
                } else if(resp.error) {
                  toast.error(resp.error, {
                    description: `Error al intentar añadir la medicina ${values.name}`,
                    action: {
                      label: "Vísto",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }
            })
          }
        } catch (error) {
          console.log(error);
        } finally {
          redirect('/mis-medicamentos');
        }

    })
  }
  
  return (
    <Sheet>
      <SheetTrigger >
        <Button variant="complete" className="flex gap-2 items-center text-white">
          <span className='hidden md:flex'>Añadir medicamento</span>
          <FaPlus />
          </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 w-[100vw] left-0 sm:left-[auto] sm:w-3/4" >
        <SheetHeader className="w-full">
          <SheetTitle>Añadir medicamento</SheetTitle>
          <SheetDescription className="h-[80vh] overflow-scroll">
            <p className='mb-3'>Los campos marcados con * son obligatorios.</p>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                    <FormItem className='w-full'>
                      <FormLabel>Nombre *</FormLabel>
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
                        <div className='flex flex-col gap-3 items-start'>
                          <FormLabel className="block">Fecha de vencímiento</FormLabel>        
                          <DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose}/>
                        </div>
                        <FormField
                            control={form.control}
                            name="img"
                            render={({field}) => (
                            <FormItem className="mt-2 flex flex-col gap-2">
                                <FormLabel className='block'>Imagen</FormLabel>
                                <FormControl>
                                    <input style={{ color:'black' }} type="file" disabled={isPending} ref={inputFileRef}/>
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
                        
                        { isPending ? <Button className="mt-2 w-full" variant="complete" type="submit" disabled={isPending}><DotLoader size={20} color="#ffffff"/></Button> : <Button className="mt-2 w-full text-white" variant="complete" type="submit">Añadir</Button> }
                </form>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

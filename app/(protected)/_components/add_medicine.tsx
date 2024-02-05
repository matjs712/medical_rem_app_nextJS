'use client'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { FaPlus } from "react-icons/fa"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useRef, useState, useTransition } from 'react'
import DatePicker from 'tailwind-datepicker-react'
import { Textarea } from '@/components/ui/textarea'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { DotLoader } from 'react-spinners'
import { uploadImage } from '@/hooks/useUploadImg'
import { addMedicine } from '@/actions/remedies'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ArrowDownIcon, CheckIcon } from '@radix-ui/react-icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { MedicinesSchema } from '@/schemas'
import { getMedicinesApi } from '@/data/apiMedicines'
import { ApiMedicines } from './medicines_columns'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'
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

const values = {
  name: "" ,
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
}

export default function AddMedicine() {

  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date | string>();
  const [defaultValuess, setDefaultValuess] = useState(values);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null | undefined>("");
  const [id, setId] = useState<string  | null>("");
  const [unit, setUnit] = useState<string | null | undefined>("");
  const [loading, setLoading] = useState(false);
  const [redirec, setRedirec] = useState(false);
  
  const [seedMedicines, setSeedMedicines] = useState<ApiMedicines[]>([]);

  const form = useForm<z.infer<typeof MedicinesSchema>>({
    resolver: zodResolver(MedicinesSchema),
    defaultValues: defaultValuess
  });

  useEffect(() => {

    const getAllSeedMedicines = async () =>{
      try {
        const apiMedicines = await getMedicinesApi()
        setSeedMedicines(apiMedicines);
        console.log('apiMedicines', apiMedicines);
      } catch (error) {
        console.log(error);
      }
    }
    getAllSeedMedicines();

  }, [])
  

  const handleClose = (state: boolean) => setShow(state);

  const handleChange = (selectedDate: Date) => {
    const expiresAt = selectedDate.toISOString();
    setDate(expiresAt);
    setDefaultValuess({
      ...defaultValuess,
      expires_at: new Date(expiresAt)
    })
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultValuess({
      ...defaultValuess,
      [e.target.name] : e.target.value
    })
  }
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultValuess({
      ...defaultValuess,
      content: parseInt(e.target.value)
    })
  }

  const onSubmit = ( values: z.infer<typeof MedicinesSchema> ) => {
    if(!defaultValuess.name) {
      setError('El medicamento necesita un nombre!')!;
      return;
    }
    if(defaultValuess.content && !defaultValuess.unit) {
      setError('Debes ingresar una unidad de medida!')!;
      return;
    }
    if(defaultValuess.content && (defaultValuess.content < 0 || defaultValuess.content == 0)){
      setError("Debes ingresar una cantidad mayor que 0!" );
      return;
    };
    if(defaultValuess.unit && !defaultValuess.content) {
      setError('Debes ingresar una cantidad!')!;
      return;
    }
    startTransition( async ()=> {
      setError("");
      setSuccess("");
      // try {
        if (!inputFileRef.current?.files) throw new Error("No file selected");
          const file = inputFileRef.current.files[0];

          if(file){
            const imgUrl = await uploadImage({ file });
            const mappedValues = { ...defaultValuess, img: imgUrl };

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
                // if(resp.redirect){
                //   setRedirec(true);
                // }
                redirect("/mis-medicamentos");
              } else if(resp.error) {
                setError(resp.error);
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
          addMedicine(defaultValuess)
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
                // if(resp.redirect){
                //   setRedirec(true);
                // }
                redirect("/mis-medicamentos");
              } else if(resp.error) {
                setError(resp.error);
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

      // } catch (error) {
      //   console.log(error);
      // }
      // if(!isPending ){
      //     redirect("/mis-medicamentos");
      // }
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
            <p className='mb-3'>Aquí puedes buscar un medicamento y modificar sus datos a tu conveniencia o simplemente registrar tu medicamento.</p>
            {/* { JSON.stringify(defaultValuess) } */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                  >
                    {value ? seedMedicines?.find((medicamento) => medicamento.name === value)?.name : "Selecciona un medicamento..."}
                      <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Busca un medicamento..." />
                      <CommandEmpty>No se encontro el medicamento.</CommandEmpty>
                      <CommandGroup className='h-[500px] overflow-y-auto'>
                        {seedMedicines?.map((medicamento,i) => (
                          <CommandItem
                            key={i}
                            value={medicamento.name || ""}
                            onSelect={(currentValue) => {
                              console.log(currentValue);
                              setValue(currentValue === value ? "" : medicamento.name);
                              setId(medicamento.id);
                              setOpen(false);
                              setUnit(medicamento.unit);
                              setDefaultValuess({
                                ...defaultValuess,
                                name: medicamento.name || "",
                                unit: medicamento.unit ||  "",
                                content: medicamento.content ||  0,
                                indications: medicamento.indications ||  "",
                                contraindications: medicamento.contraindications ||  "",
                                description: medicamento.description || "",
                                type: medicamento.type || "",
                                expires_at: new Date(),
                                img: "",
                                isImportant: false
                                                      
                              });
                            }} >
                          <CheckIcon className={cn( "mr-2 h-4 w-4", value === medicamento.name ? "opacity-100" : "opacity-0" )}/>{medicamento.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
          <p className='my-3'>Los campos marcados con * son obligatorios.</p>
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
                        name='name'
                        onChange={(e)=>onChange(e)}
                        placeholder="Tramadol"
                        disabled={isPending}
                        value={defaultValuess.name}
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
                                    <Textarea
                                    {...field}
                                    name='description'
                                    // onChange={(e)=>onChange(e)}
                                    value={defaultValuess.description}
                                    style={{ color:'black' }}
                                    placeholder="Medicamento utilizado para el alivio de síntomas asociados con resfriados y gripes, como congestión nasal, dolor de cabeza, fiebre y malestar general"
                                    className="h-[150px] resize-none" 
                                    disabled={isPending}/>
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
                                    <Textarea style={{ color:'black' }} placeholder="Este medicamento se utiliza para aliviar los síntomas de la fiebre y el dolor asociados con diversas condiciones médicas, como resfriados, gripe, dolores musculares y dolor de cabeza." {...field} name='indications' value={defaultValuess.indications} className="h-[130px] resize-none" disabled={isPending}/>
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
                                    <Textarea style={{ color:'black' }} placeholder="No debe utilizarse en personas con alergia conocida a alguno de los ingredientes del medicamento." {...field} name='contraindications' value={defaultValuess.contraindications} className="h-[130px] resize-none" disabled={isPending}/>
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
                                {...field}
                                name='content'
                                onChange={(e)=>onChangeContent(e)}
                                value={defaultValuess.content}
                                    style={{ color:'black' }} type="number" placeholder="21" disabled={isPending}/>
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
                                    {...field}
                                    name='unit'
                                    onChange={(e)=>onChange(e)}
                                    value={defaultValuess.unit}
                                        style={{ color:'black' }} placeholder="gr" disabled={isPending}/>
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
                                    {...field}
                                    name='type'
                                    onChange={(e)=>onChange(e)}
                                    value={defaultValuess.type}
                                        style={{ color:'black' }} placeholder="Ansiolítico" disabled={isPending}/>
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
                                <Checkbox
                                  id="isImportant"
                                  checked={defaultValuess.isImportant}
                                  onCheckedChange={(checked) => {
                                    field.onChange(()=>{
                                      setDefaultValuess({
                                        ...defaultValuess,
                                        isImportant: !!checked
                                      });
                                    }); // Llamada a la función onChange del campo
                                  }}
                                  disabled={isPending}
                                />
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

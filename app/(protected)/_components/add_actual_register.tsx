'use client'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { FaArrowTrendDown, FaPlus } from "react-icons/fa6"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { DotLoader } from "react-spinners"
import DatePicker from "tailwind-datepicker-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState, useTransition } from "react"
import { RegistersSchema } from "@/schemas"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ArrowDownIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { getData } from '@/data/medicines'
import { Medicine } from './medicines_columns'
import { addRegister } from '@/actions/registers'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

  const options = {
    title: "Fecha de inicio tratamiento",
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
    inputNameProp: "start_at",
    inputIdProp: "start_at",
    inputPlaceholderProp: "Selecciona una fecha",
    inputDateFormatProp: {
      day: "numeric" as "numeric" | "2-digit" | undefined,
      month: "long" as "numeric" | "long" | "2-digit" | "short" | "narrow" | undefined,
      year: "numeric" as "numeric" | "2-digit" | undefined,
    },
    background:"bg-white",
  }
const AddActualRegister = () => {

const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date | string>();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
    
  useEffect(() => {
    const getMedicinesAll = async () => {
        const medicines = await getData();
        setMedicines(medicines);
        console.log(medicines);
    }
    getMedicinesAll();
  }, [])
  

    const form = useForm<z.infer<typeof RegistersSchema>>({
        resolver: zodResolver(RegistersSchema),
        defaultValues: {
            remediesId: '',
            dosis: 0,
            start_at: '',
            lapsus: 0,
            isCompleted: false,
            time: '',
        },
      });
    
      const handleClose = (state: boolean) => setShow(state);
      const handleChange = (selectedDate: Date) => {
        const expiresAt = selectedDate.toISOString();
        setDate(expiresAt);
      };
    const onSubmit = (values: any) => {
        // console.log(value);
        setError("");
        setSuccess("");
        startTransition(async ()=> {
            try {
              console.log({...values, remediesId:id, start_at: date});
              const newValues = {...values, remediesId:id, start_at: date}
              addRegister(newValues)
              .then((resp)=> {
                  if(resp.success) {
                    setSuccess(resp.success);
                    toast.success(resp.success, {
                      description: `Se ha añadido el registro con éxito!`,
                      action: {
                        label: "Vísto",
                        onClick: () => console.log("Undo"),
                      },
                    });
                
                  } else if(resp.error) {
                      setError(resp.error);
                    toast.error(resp.error, {
                      description: `Error al intentar añadir el registro.`,
                      action: {
                        label: "Vísto",
                        onClick: () => console.log("Undo"),
                      },
                    });
                  }
              })
            } catch (error) {
              console.log(error);
            } finally {
              // redirect('/dashboard');
            }
        })
    }

  return (
    <>
        <Sheet>
        <SheetTrigger>
            <Button variant="complete" size="lg" className="text-white flex items-center gap-2">
                <span className="hidden md:flex">Añadir al tratamiento</span>
                <FaPlus />
            </Button></SheetTrigger>
        <SheetContent className="flex flex-col gap-4 w-[100vw] left-0 sm:left-[auto] sm:w-3/4" >
            <SheetHeader className="w-full">
            <SheetTitle>Estás a punto de añadir un nuevo registro a tu tratamiento actual.</SheetTitle>
            <SheetDescription className="h-[80vh] overflow-scroll">
                <p className="mb-6">Para poder ingresar un nuevo registro, necesitas tener medicamentos registrados</p>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                        >
                        <FormField
                            control={form.control}
                            name="remediesId"
                            render={({field}) => (
                            <FormItem className='flex flex-col gap-1'>
                                <FormLabel>Selecciona un medicamento.</FormLabel>
                                <FormControl className='w-full text-black'>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                        >
                                        {value
                                            ? medicines.find((medicamento) => medicamento.name === value)?.name
                                            : "Selecciona un medicamento..."}
                                        <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                        <CommandInput placeholder="Search medicamento..." />
                                        <CommandEmpty>No medicamento found.</CommandEmpty>
                                        <CommandGroup>
                                            {medicines.map((medicamento) => (
                                            <CommandItem
                                                key={medicamento.name}
                                                value={medicamento.name}
                                                onSelect={(currentValue) => {
                                                    console.log(currentValue);
                                                    setValue(currentValue === value ? "" : medicamento.name);
                                                    setId(medicamento.id);
                                                    setOpen(false);
                                                    setUnit(medicamento.unit);
                                                }}
                                            >
                                                <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === medicamento.name ? "opacity-100" : "opacity-0"
                                                )}
                                                />
                                                {medicamento.name}
                                            </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                    </Popover>
                                </FormControl>
                                {/* <FormDescription /> */}
                                <FormMessage className='m-0'/>
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dosis"
                            render={({field}) => (
                                <FormItem >
                                <FormLabel>Dosis</FormLabel>
                                <FormControl>
                                <Input style={{ color:'black' }} type="number" placeholder="21" {...field} disabled={isPending} className='text-black'/>
                                </FormControl>
                                {unit && <span className='border rounded p-[6px] bg-white border-gray-300' style={{ margin:'0' }}>{unit}</span>}
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                       
                       <FormField
                            control={form.control}
                            name="lapsus"
                            render={({field}) => (
                                <FormItem >
                                <FormLabel>Cada cuanto tiempo tomarás tu medicina</FormLabel>
                                <FormControl>
                                <Input style={{ color:'black' }} type="number" placeholder="21" {...field} disabled={isPending} className='text-black'/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tiempo en</FormLabel>
                                <FormControl>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={(selectedValue) => {
                                            field.onChange(selectedValue);
                                        }}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full text-black">
                                            <SelectValue placeholder="Tiempo en" />
                                        </SelectTrigger>
                                        <SelectContent className='m-0 text-black'>
                                            <SelectItem value="hrs" className='text-black'>Horas</SelectItem>
                                            <SelectItem value="min" className='text-black'>Minutos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
    )}
/>

                        

                        <div className='flex flex-col gap-3'>
                            <FormLabel className="block">Fecha de inicio</FormLabel>
                            <DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose} classNames='bg-white text-black'/>
                        </div>

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        
                            { isPending ? <Button className="mt-2 w-full" type="submit" disabled={isPending}><DotLoader size={20} color="#ffffff"/></Button> : <Button className="mt-2 w-full" type="submit">Añadir</Button> }
                        </form>
                    </Form>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
    </>
  )
}

export default AddActualRegister
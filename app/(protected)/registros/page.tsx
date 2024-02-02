'use client'
import { useEffect, useState } from "react";
import AddActualRegister from "../_components/add_actual_register"
import { Card, CardContent } from "@/components/ui/card";
import NoSsr from "@mui/material/NoSsr";
import RegistersTable from "../_components/registers_table";
import { columns } from "../_components/registers_columns";
import { Register } from "../_components/medicines_columns";
import { getRegistersData } from "@/data/all_registers";
import LoadingTable from "../_components/loading_table";

const RegistrosPage = () => {

  const [registers, setRegisters] = useState<Register[]>([]); // Provide initial type as 'Registers[] | undefined'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const registersData = await getRegistersData()
        console.log('data registers',registersData)
        setRegisters(registersData);

      } catch (error) {
        console.error('Error setting medicines data:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    <div className="flex items-center justify-between flex-wrap">
      <h2 className="text-4xl font-semibold my-4" style={{ letterSpacing:"0.6px" }}>Mis<span className="text-[#2ecc71]"> Registros</span></h2>
      <AddActualRegister redirec="redirect"/>
    </div>
    <div className="h-fit rounded-lg flex flex-wrap items-center gap-2 justify-center">
    { loading ? <Card className="w-full h-fit-content">
        <CardContent className="pt-5 ">
        <NoSsr><LoadingTable/></NoSsr>
        </CardContent>
      </Card> : <Card className="w-[380px] sm:w-full h-fit-content">
        <CardContent className="pt-5">
        <RegistersTable columns={columns} data={registers}/>
        </CardContent>
      </Card> }
    </div>
  </>
  )
}

export default RegistrosPage
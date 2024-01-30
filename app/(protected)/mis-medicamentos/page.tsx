'use client';

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import Medicines from "../_components/medicines"
import { Medicine, columns } from "../_components/medicines_columns"
import { useEffect } from "react";
import NoSsr from "@mui/material/NoSsr";
import LoadingTable from "../_components/loading_table";
import { Card, CardContent } from "@/components/ui/card";
import { getData } from "@/data/remedios";
// import { getData } from "@/data/remedios";

const RemediosPage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const medicinesData = await getData();
        setMedicines(medicinesData);

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
      <h2 className="text-4xl font-semibold my-4" style={{ letterSpacing:"0.6px" }}>Mis<span className="text-[#2ecc71]"> medicamentos</span></h2>
      <Button variant="complete" size="lg" className="text-white flex items-center gap-2">
        <span className="hidden md:flex">Añadir medicamento</span>
        <FaPlus />
      </Button>
    </div>
    <div className="h-fit rounded-lg flex flex-wrap items-center gap-2 justify-center">
      { loading ? <Card className="w-full h-fit-content">
        <CardContent className="pt-5 ">
          <NoSsr><LoadingTable/></NoSsr>
        </CardContent>
      </Card> : <Card className="w-[380px] sm:w-full h-fit-content">
        <CardContent className="pt-5">
          <Medicines columns={columns} data={medicines}/>
        </CardContent>
      </Card> }
    </div>
  </>
  )
}

export default RemediosPage
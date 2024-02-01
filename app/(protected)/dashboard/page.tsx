import { Suspense } from "react"
import RegistersHome from "../_components/RegistersHome"
import Loading from "../_components/Loading_Registers_Home"
import AddActualRegister from "../_components/add_actual_register";
import { getRemedies } from "@/data/remedios";

const Dashboard = async () => {

  const medicines = await getRemedies()
  
  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-4xl font-semibold my-4" style={{ letterSpacing:"0.6px" }}>Tratamiento <span className="text-[#2ecc71]">Actual</span></h2>
        { medicines && medicines.length > 0 ?  <AddActualRegister/> : '' }
      </div>
      { medicines && medicines.length > 0 ? <p className="text-gray-700 text-justify">Aquí podrás explorar los registros detallados de tu tratamiento actual. Aquí encontrarás información valiosa sobre tus medicamentos, dosis, fechas importantes y mucho más.</p> : ''}
      <br /><br />
      <div className="w-full h-fit rounded-lg flex flex-wrap items-center gap-2">
        <Suspense fallback={<Loading/>}>
          <RegistersHome/>  
        </Suspense>        
      </div>
      {/* <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg">
        Registros actuales
      </div> */}
    </>
  )
}

export default Dashboard
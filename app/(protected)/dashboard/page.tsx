import { Suspense } from "react"
import RegistersHome from "../_components/RegistersHome"
import Loading from "../_components/Loading_Registers_Home"

const Dashboard = async () => {

  return (
    <>
      <h2 className="text-4xl font-semibold my-4" style={{ letterSpacing:"0.6px" }}>Tratamiento <span className="text-[#2ecc71]">Actual</span></h2>
      <div className="w-full h-fit rounded-lg flex flex-wrap items-center gap-2">
        <Suspense fallback={<Loading/>}>
          <RegistersHome/>  
        </Suspense>        
      </div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg">
        actual register's
      </div>
    </>
  )
}

export default Dashboard
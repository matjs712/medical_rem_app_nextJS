import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BarLoader } from "react-spinners"

const LoadingTable = () => {
  return (
    <>
      {Array(1).fill(0).map((el, index) => (
       <table className="w-full table-auto hidden lg:block">
       <thead>
         <tr>
           <th><Skeleton className="h-4 w-[100px]" /></th>
           <th><Skeleton className="h-4 w-[50px]" /></th>
           <th><Skeleton className="h-4 w-[30px]" /></th>
         </tr>
       </thead>
       <tbody className="justify-between">
         <tr>
           <td><Skeleton className="my-2 h-4 w-[340px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[200px]" /></td>
           <td ><Skeleton className="my-2 h-4 w-[160px]" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-[130px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[220px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[240px]" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-[170px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[200px]" /></td>
           <td ><Skeleton className="my-2 h-4 w-[160px]" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-[130px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[220px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[240px]" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-[170px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[200px]" /></td>
           <td ><Skeleton className="my-2 h-4 w-[160px]" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-[130px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[220px]" /></td>
           <td><Skeleton className="my-2 h-4 w-[240px]" /></td>
         </tr>
         <tr>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
           <td><Skeleton className="my-2 h-4 w-full" /></td>
         </tr>
       </tbody>
     </table>
      ))  }
      <div className="lg:hidden block">
        <table className="w-full table-auto">
        <thead>
          <tr>
            <th><Skeleton className="my-2 h-4 w-[100px]" /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          <tr>
            <td><Skeleton className="my-2 h-4 w-full" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default LoadingTable
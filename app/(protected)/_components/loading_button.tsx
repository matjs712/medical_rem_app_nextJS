import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const LoadingButton = () => {
  return (
    <>
      {Array(1).fill(0).map((el, index) => (
        <Skeleton key={index} className="h-[40px] w-[80px] md:w-[220px] flex items-center" />
      ))  }
    </>
  )
}

export default LoadingButton
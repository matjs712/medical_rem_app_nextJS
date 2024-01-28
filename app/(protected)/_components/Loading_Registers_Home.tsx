import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Loading = () => {
  return (
    <>
      {Array(6).fill(0).map((el, index) => (
        <Card className="w-[100%] lg:w-[300px] h-[280px]">
        <CardHeader>
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name"><Skeleton className="h-4 w-[270px]" /></Label>
                <Skeleton className="h-4 w-[270px]" />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Skeleton className="h-4 w-[40px]" />
            <Skeleton className="h-4 w-[40px]" />
        </CardFooter>
    </Card>
      ))  }
    </>
  )
}

export default Loading
'use server'

import { Medicine } from "@/app/(protected)/_components/medicines_columns";
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const getRemedies = async () => {
    try {
        const user = await currentUser();
        const remedies = db.remedies.findMany({
            where: {
                userId: user?.id
            }
        })

        return remedies;
    } catch (error) {
        console.log(error);
        return null
    }
}
export const getMedicine = async (id:string) => {
    try {
        const user = await currentUser();
        const medicine = db.remedies.findUnique({
            where: { 
                id,
                userId: user?.id,
             }
        })

        return medicine;
    } catch (error) {
        console.log(error);
        return null
    }
}

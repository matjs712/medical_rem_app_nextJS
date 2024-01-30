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

export async function getData(): Promise<Medicine[]> {
    try {
      const response = await fetch('/api/medicines',  { next: { revalidate: 3600 }, cache:'no-store' });
      const data = await response.json();
      console.log(data);
  
      return data;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  }
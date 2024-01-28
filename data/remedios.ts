'use server'

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
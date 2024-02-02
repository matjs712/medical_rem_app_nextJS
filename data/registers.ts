'use server'

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getRegisters = async () => {
    try {
        const user = await currentUser();

        const registers = await db.registers.findMany({
            where: {
              userId: user?.id,
              isCompleted: false,
            },
            include: {
                remedies: true,
            },
          });
                
        return registers;
    } catch (e) {
        console.log(e);
        return null;
    }
}

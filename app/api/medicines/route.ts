import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const user = await currentUser();
    if(!user) return ;
    const remedies = await db.remedies.findMany({
        where: { userId: user.id }
    });
    return NextResponse.json(remedies);
}
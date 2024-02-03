import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const user = await currentUser();
    if(!user) return ;
    const medicinesapi = await db.medicinesApi.findMany();
    return NextResponse.json(medicinesapi);
}
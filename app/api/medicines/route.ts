import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    const user = await currentUser();

    const remedies = await db.remedies.findMany();
    return NextResponse.json(remedies);
}
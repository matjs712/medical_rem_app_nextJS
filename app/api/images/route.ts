import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
    try {
        const json = await request.json();
        await del(json.url);
        return NextResponse.json({}); 
    } catch (error) {
        console.log(error);
    }
}
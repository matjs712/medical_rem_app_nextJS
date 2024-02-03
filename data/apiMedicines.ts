'use client'

import { ApiMedicines } from "@/app/(protected)/_components/medicines_columns";

export async function getMedicinesApi(): Promise<ApiMedicines[]> {
    try {
        const response = await fetch('/api/apimedicines',  { next: { revalidate: 3600 } });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
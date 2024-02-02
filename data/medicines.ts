'use client'
import { Medicine } from "@/app/(protected)/_components/medicines_columns";

export async function getData(): Promise<Medicine[]> {
    try {
      const response = await fetch('/api/medicines',  { next: { revalidate: 3600 } });
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  }
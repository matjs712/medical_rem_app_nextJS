'use client'
import { Register } from "@/app/(protected)/_components/medicines_columns";

export async function getRegistersData(): Promise<Register[]> {
    try {
      const response = await fetch('/api/registers',  { next: { revalidate: 3600 } });
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error fetching registers:', error);
      throw error;
    }
  }
"use server"
import { Category } from "@/types/product.type";

export async function getAllCategories(): Promise<Category[] | null> {
  try {
    const response = await fetch(`${process.env.apiLink_v1}/categories`, {
      cache: "force-cache",
    });
    const finalRes = await response.json();
    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

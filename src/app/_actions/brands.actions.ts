"use server";

import { brandsType } from "@/types/brands.type";

export async function getAllBrands():Promise<brandsType> {
  const res = await fetch(`${process.env.apiLink_v1}/brands`);
  const finalRes = await res.json();
  return finalRes
}

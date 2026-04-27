"use server";
import { productType } from "@/types/product.type";

export async function getProducts(
  categoryId?: string,
  brandId?: string,
): Promise<productType[] | null> {
  try {
    const url = categoryId
      ? `${process.env.apiLink_v1}/products/?category[in]=${categoryId}`
      : brandId
        ? `${process.env.apiLink_v1}/products/?brand=${brandId}`
        : `${process.env.apiLink_v1}/products`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    const finalRes = await response.json();
    return finalRes?.data ?? null;
  } catch {
    return null;
  }
}

export async function getProduct(id: string): Promise<productType | null> {
  try {
    const response = await fetch(`${process.env.apiLink_v1}/products/${id}`, {
      next: { revalidate: 60 },
    });
    const finalRes = await response.json();
    return finalRes?.data ?? null;
  } catch {
    return null;
  }
}

export async function getSubProducts(
  id: string,
): Promise<productType[] | null> {
  try {
    const res = await fetch(
      `${process.env.apiLink_v1}/products?category[in]=${id}`,
      {
        next: { revalidate: 3600 },
      },
    );
    const finalRes = await res.json();
    return finalRes?.data ?? null;
  } catch {
    return null;
  }
}

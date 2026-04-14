import { productType } from "@/types/product.type";

export async function getAllProducts(): Promise<productType[] | null> {
  try {
    const response = await fetch(`${process.env.apiLink_v1}/products`, {
      next: { revalidate: 3600 },
      cache:'force-cache'
    });
    const finalRes = await response.json();

    return finalRes?.data;
  } catch {
    return null;
  }
}

export async function getProduct(id: string): Promise<productType|null> {
  try {
    const response = await fetch(`${process.env.apiLink_v1}/products/${id}`, {
      cache: "force-cache",
    });
    const finalRes = await response.json();

    return finalRes?.data;
  } catch (error) {
    console.log(error);

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
        cache: "force-cache",
        
      },
      
    );
    const finalRes = await res.json();
    return finalRes.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

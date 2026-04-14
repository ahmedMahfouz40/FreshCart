"use server";

import { cartResType } from "@/types/cartContext.type";
import getMyToken from "@/utils/getMyToken";

export async function addProductToCart(
  productId: string,
): Promise<cartResType> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v2}/cart`, {
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },

    body: JSON.stringify({ productId }),
    method: "POST",
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function getLoggedUserCart(): Promise<cartResType> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v2}/cart`, {
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function updateCartProduct(
  productId: string,
  count: number,
): Promise<cartResType> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v2}/cart/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({ count: count }),
    method: "PUT",
  });
  const finalRes = await res.json();
  console.log(token, "token");

  return finalRes;
}

export async function deleteProductFromCart(
  productId: string,
): Promise<cartResType> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v2}/cart/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    method: "DELETE",
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function ClearUserCart() {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v2}/cart`, {
    headers: {
      token: token as string,
    },
    method: "DELETE",
  });
  const finalRes = await res.json();
  return finalRes;
}




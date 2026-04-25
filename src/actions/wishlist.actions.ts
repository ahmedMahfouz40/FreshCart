"use server";

import { wishlistDataType } from "@/types/wishlist.type";
import getMyToken from "@/utils/getMyToken";

export async function addToWishlist(productId: string) {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/wishlist`, {
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ productId: productId }),
  });
  const finalRes = await res.json();

  return finalRes;
}

export async function getUserWishlist():Promise<wishlistDataType> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/wishlist`, {
    headers: {
      token: token as string,
    },
  });
  const finalRes = await res.json();

  return finalRes;
}

export async function DeleteFromWishlist(productId: string) {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/wishlist/${productId}`, {
    headers: {
      token: token as string,
    },
    method: "DELETE",
  });
  const finalRes = await res.json();

  return finalRes;
}
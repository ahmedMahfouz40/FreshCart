"use server";

import {
  createOrderResponse,
  orderData,
  shippingAddressType,
} from "@/types/order.type";
import getMyToken from "@/utils/getMyToken";
import { veriryToken } from "./verifyToken";

export async function createCashOrder(
  cartId: string,
  shippingAddress: shippingAddressType,
): Promise<createOrderResponse> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v2}/orders/${cartId}`, {
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify(shippingAddress),
    method: "POST",
  });
  const finalRes = await res.json();
  return finalRes;
}
export async function createVisaOrder(
  cartId: string,
  shippingAddress: shippingAddressType,
) {
  const token = await getMyToken();
  const res = await fetch(
    `${process.env.apiLink_v1}/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(shippingAddress),
      method: "POST",
    },
  );
  const finalRes = await res.json();
  return finalRes;
}

export async function getUserOrders(): Promise<orderData[]> {
  const tkn = await veriryToken();
  const userId = tkn.decoded.id;
  const res = await fetch(`${process.env.apiLink_v1}/orders/user/${userId}`);
  const finalRes = await res.json();
  return finalRes;
}

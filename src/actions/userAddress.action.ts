"use server";
import { addAddressDataType, userAddressRes } from "@/types/addresses.type";
import getMyToken from "@/utils/getMyToken";

export async function getLogedUserAddress(): Promise<userAddressRes> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/addresses`, {
    headers: {
      token: token as string,
    },
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function addUserAddress(
  userData: addAddressDataType,
): Promise<userAddressRes> {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/addresses`, {
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });

  const finalRes = await res.json();
  console.log(finalRes, "finalRes from adding address");

  return finalRes;
}

export async function DeleteAddress(
  addressId: string,
): Promise<userAddressRes> {
  const token = await getMyToken();

  const res = await fetch(`${process.env.apiLink_v1}/addresses/${addressId}`, {
    headers: {
      token: token as string,
    },
    method: "DELETE",
  });
  const finalRes = await res.json();
  return finalRes;
}




export async function updateUserAddress(
  addressId: string,
  userData: addAddressDataType,
): Promise<userAddressRes> {
  const token = await getMyToken();

  // Delete the old address first
  await fetch(`${process.env.apiLink_v1}/addresses/${addressId}`, {
    headers: { token: token as string },
    method: "DELETE",
  });

  // then create a new one with the updated data
  const res = await fetch(`${process.env.apiLink_v1}/addresses`, {
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });

  const finalRes = await res.json();
  return finalRes;
}

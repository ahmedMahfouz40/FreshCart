"use server";
import getMyToken from "@/utils/getMyToken";
import { string } from "zod";

interface updateUserDataProps {
  name: string;
  email: string;
  phone: string;
}
interface changeUserPasswordProps {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export async function updateLoggedUserData(userData: updateUserDataProps) {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/users/updateMe/`, {
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(userData),
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function changeUserPassword(
  userPassword: changeUserPasswordProps,
) {
  const token = await getMyToken();
  const res = await fetch(`${process.env.apiLink_v1}/users/changeMyPassword`, {
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(userPassword),
  });
  const finalRes = await res.json();
  return finalRes;
}

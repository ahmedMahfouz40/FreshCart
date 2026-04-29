"use server";
import getMyToken from "@/utils/getMyToken";
// Props Interfaces
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
interface forgotPasswordProps {
  email: string;
}
interface verifyResetCodeProps {
  resetCode: string;
}
interface resetPasswordProps {
  email: string;
  newPassword: string;
}
// End Props Interfaces

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

export async function forgotPassword(userData: forgotPasswordProps) {
  const res = await fetch(`${process.env.apiLink_v1}/auth/forgotPasswords`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function verifyResetCode(code: verifyResetCodeProps) {
  const res = await fetch(`${process.env.apiLink_v1}/auth/verifyResetCode`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(code),
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function resetPassword(newPassword: resetPasswordProps) {
  const res = await fetch(`${process.env.apiLink_v1}/auth/resetPassword`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(newPassword),
  });
  const finalRes = await res.json();
  return finalRes;
}

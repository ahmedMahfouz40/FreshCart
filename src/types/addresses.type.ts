import { addAddressSchema } from "@/schemas/AddAddress.schema";
import * as z from "zod";
export interface userAddressRes {
  status: "success" | "fail";
  results?: number;
  message?: string;
  data: address[];
}
export interface address {
  city: string;
  details: string;
  name: string;
  phone: string;
  _id: string;
}

export type addAddressDataType = z.infer<typeof addAddressSchema>;

export interface addressInitialStateType {
  userAddresses: address[];
  isLoading: boolean;
  isError: boolean;
  hasFetched: boolean;
}

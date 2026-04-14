import { productType } from "./product.type";

export interface wishlistDataType {
  count: number;
  status: string;
  data: productType[];
}

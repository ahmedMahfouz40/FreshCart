import { productType } from "./product.type";

export interface cartResType {
  cartId: string;
  status: string;
  message: string;
  statusMsg: string;
  numOfCartItems: number;
  data: {
    totalCartPrice: number;
    products: cartItemType[];
  };
}
export interface cartItemType {
  price: number;
  count: number;
  _id?: string;
  product: productType;
}

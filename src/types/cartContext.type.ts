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
  _id?:string
  product: productType;
}

export type CartContextType = {
  numOfCartItems: number;
  setNumofCartItems: React.Dispatch<React.SetStateAction<number>>;
  totalCartPrice: number;
  setTotalCartPrice: React.Dispatch<React.SetStateAction<number>>;
  cartProducts: cartItemType[] | undefined;
  setCartProducts: React.Dispatch<
    React.SetStateAction<cartItemType[] | undefined>
  >;
  isUserDataLoading: boolean;
  cartId: string;
  setCartId: React.Dispatch<React.SetStateAction<string>>;
};

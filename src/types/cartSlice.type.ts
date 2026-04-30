import { cartItemType } from "./cart.type";

export interface cartState {
  cartId: string;
  numOfCartItems: number;
  totalCartPrice: number;
  cartProducts: cartItemType[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle:boolean
}

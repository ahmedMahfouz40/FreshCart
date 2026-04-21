import { productType } from "./product.type";

export interface wishlistSliceType {
  wishlistProducts: productType[] | [];
  isLoading: boolean;
  isError: boolean;
  isInWishlist: string;
  wishlistIds: string[];
}

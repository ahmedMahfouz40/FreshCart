import { productType } from "./product.type";

export interface wishlistDataType {
  count: number;
  status: string;
  data: productType[];
}

export interface wishlistSliceType {
  wishlistProducts: productType[] | [];
  isLoading: boolean;
  hasFetched: boolean;
  isError: boolean;
  isInWishlist: string;
  wishlistIds: string[];
}

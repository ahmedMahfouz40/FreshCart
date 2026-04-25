import { getUserWishlist } from "@/actions/wishlist.actions";
import { productType } from "@/types/product.type";
import { wishlistSliceType } from "@/types/wishlist.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async () => {
    const userWishlist = await getUserWishlist();
    return userWishlist;
  },
);

const initialState: wishlistSliceType = {
  wishlistProducts: [],
  wishlistIds: [],
  isLoading: false,
  hasFetched: false,
  isError: false,
  isInWishlist: "",
};
const wishlistSlice = createSlice({
  initialState,
  name: "wishlist",
  reducers: {
    removeFromWishlist: (state, action) => {
      state.wishlistProducts = state.wishlistProducts.filter(
        (item) => item._id !== action.payload,
      );
      state.wishlistIds = state.wishlistIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserWishlist.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.hasFetched = false;
    });
    builder.addCase(fetchUserWishlist.fulfilled, (state, action) => {
      const userWishlist = action.payload;
      if (!userWishlist || userWishlist.status !== "success") {
        state.wishlistProducts = [];
        state.wishlistIds = [];
        state.isLoading = false;
        state.isError = true;
        return;
      }
      state.wishlistProducts = userWishlist.data;
      state.wishlistIds = userWishlist.data.map(
        (item: productType) => item._id,
      );
      state.hasFetched = true;
      state.isLoading = false;
      state.isError = false;
    });
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { removeFromWishlist } = wishlistSlice.actions;

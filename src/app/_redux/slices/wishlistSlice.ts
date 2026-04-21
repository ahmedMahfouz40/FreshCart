import { getUserWishlist } from "@/app/_actions/wishlist.actions";
import { productType } from "@/types/product.type";
import { wishlistSliceType } from "@/types/wishlistSlice.type";
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
    });
    builder.addCase(fetchUserWishlist.fulfilled, (state, action) => {
      const userWishlist = action.payload;
      if (!userWishlist || userWishlist.status !== "success") {
        state.wishlistProducts = [];
        state.wishlistIds = [];
        return;
      }
      state.wishlistProducts = userWishlist.data;
      state.wishlistIds = userWishlist.data.map(
        (item: productType) => item._id,
      );

      state.isLoading = false;
      state.isError = false;
    });
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { removeFromWishlist } = wishlistSlice.actions;

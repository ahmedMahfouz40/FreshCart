import { getLoggedUserCart } from "@/actions/cart.actions";
import { cartState } from "@/types/cartSlice.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async () => {
    const userData = await getLoggedUserCart();
    return userData;
  },
);

const initialState: cartState = {
  cartId: "",
  numOfCartItems: 0,
  totalCartPrice: 0,
  cartProducts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartId = "";
      state.numOfCartItems = 0;
      state.totalCartPrice = 0;
      state.cartProducts = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.product._id !== action.payload,
      );
      state.numOfCartItems -= 1;
    },

    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartProducts.find((p) => p.product._id === productId);
      if (item) {
        item.count = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(fetchUserCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.cartProducts = [];
    });
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      const userCart = action.payload;
      state.isLoading = false;
      state.isSuccess = userCart.status === "success";

      if (!userCart || userCart.status !== "success") {
        state.cartProducts = [];
        state.cartId = "";
        state.numOfCartItems = 0;
        state.totalCartPrice = 0;
        return;
      }

      state.cartId = userCart.cartId;
      state.cartProducts = userCart.data.products;
      state.numOfCartItems = userCart.numOfCartItems;
      state.totalCartPrice = userCart.data.totalCartPrice;
    });
  },
});

export const { clearCart, removeFromCart, updateCartQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;

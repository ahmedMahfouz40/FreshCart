import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../slices/cartSlice";
import { wishlistReducer } from "../slices/wishlistSlice";
import { userAddressReducer } from "../slices/addressSlice";

export const store = configureStore({
  reducer: {
    cartReducer,
    wishlistReducer,
    userAddressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

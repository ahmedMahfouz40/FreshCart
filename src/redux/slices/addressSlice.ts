import { getLogedUserAddress } from "@/actions/userAddress.action";
import { addressInitialStateType } from "@/types/addresses.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserAddress = createAsyncThunk(
  "addresses/fetchUserAddress",
  async () => {
    const userAddresses = await getLogedUserAddress();
    return userAddresses;
  },
);

const initialState: addressInitialStateType = {
  userAddresses: [],
  isLoading: true,
  isError: false,
  hasFetched: false,
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    removeAddress: (state, action) => {
      state.userAddresses = state.userAddresses.filter(
        (item) => item._id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserAddress.rejected, (state) => {
      state.isLoading = false;
      state.hasFetched = false;
      state.isError = true;
    });
    builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
      const userAddresses = action.payload;
      if (!userAddresses || userAddresses.status !== "success") {
        state.userAddresses = [];
        state.isLoading = false;
        state.isError = true;
        return;
      }
      state.isLoading = false;
      state.isError = false;
      state.hasFetched = true;

      state.userAddresses = userAddresses.data;
    });
  },
});

export const userAddressReducer = addressSlice.reducer;
export const { removeAddress } = addressSlice.actions;

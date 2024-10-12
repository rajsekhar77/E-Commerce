import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/products/getAllOrdersForAdmin",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get`
    );
    return result?.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/products/getOrderDetailsForAdmin",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`
    );
    return result?.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/products/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
      { orderStatus }
    );
    return result?.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default adminOrderSlice.reducer;

export const { resetOrderDetails } = adminOrderSlice.actions;

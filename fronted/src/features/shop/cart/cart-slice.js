import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/cart/add",
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);

export const updateCartQty = createAsyncThunk(
  "cart/updateCartQty",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:3000/api/shop/cart/update-cart",
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const delteCartItem = createAsyncThunk(
  "cart/delteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQty.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(delteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(delteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;

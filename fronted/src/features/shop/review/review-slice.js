import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/products/addReview",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/reviews/add`,
      formData
    );
    return result?.data;
  }
);

export const getReviews = createAsyncThunk(
  "/products/getReviews",
  async (productId) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/reviews/${productId}`
    );
    return result?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action?.payload?.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });

    // for the addReview we no need builder because once we add the review, we are
    // fetching the review details from getReviews and update the state
  },
});

export default reviewSlice.reducer;

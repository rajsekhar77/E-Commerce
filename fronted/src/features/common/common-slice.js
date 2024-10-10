import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const addFeatureImage = createAsyncThunk(
  "/addresses/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      "http://localhost:3000/api/common/feature/add",
      { image }
    );
    return response.data;
  }
);

export const getFeatureImages = createAsyncThunk(
  "/addresses/getFeatureImages",
  async () => {
    const response = await axios.get(
      `http://localhost:3000/api/common/feature/get`
    );
    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action?.payload?.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        (state.isLoading = false), (state.featureImageList = []);
      });
  },
});

export default commonSlice.reducer;

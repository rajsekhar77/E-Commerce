import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: []
};

export const getSearchResult = createAsyncThunk(
    "/products/getSearchResult",
    async (keyword) => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
      );
      return result?.data;
    }
  );

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state)=> {
      state.searchResults = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
        state.isLoading = true;
    }).addCase(getSearchResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action?.payload?.data;
    }).addCase(getSearchResult.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = []
    })
  }
});

export const {resetSearchResults} = searchSlice.actions;
export default searchSlice.reducer;

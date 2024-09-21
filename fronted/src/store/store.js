import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import adminProdcutsSlice from "../features/admin/products/productSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: adminProdcutsSlice,
  },
});

export default store;
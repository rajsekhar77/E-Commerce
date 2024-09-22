import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import adminProdcutsSlice from "../features/admin/products/productSlice.js";
import shopProductsSlice from "../features/shop/products/products-slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: adminProdcutsSlice,
    shopProducts: shopProductsSlice,
  },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import adminProdcutsSlice from "../features/admin/products/productSlice.js";
import shopProductsSlice from "../features/shop/products/products-slice.js";
import shopCartSlice from "../features/shop/cart/cart-slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: adminProdcutsSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
  },
});

export default store;
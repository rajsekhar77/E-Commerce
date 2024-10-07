import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import adminProdcutsSlice from "../features/admin/products/productSlice.js";
import shopProductsSlice from "../features/shop/products/products-slice.js";
import shopCartSlice from "../features/shop/cart/cart-slice.js";
import shopAddressSlice from "../features/shop/address/address-slice.js";
import shopOrderSlice from "../features/shop/order/order-slice.js";
import adminOrderSlice from "../features/admin/orders/order-slice.js";
import shopReviewSlice from "../features/shop/review/review-slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts: adminProdcutsSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    adminOrder: adminOrderSlice,
    shopReview: shopReviewSlice,
  },
});

export default store;
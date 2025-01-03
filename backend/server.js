import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongoDb from "./DB/connectToMongoDB.js";

import authRouter from "./routes/auth/auth-routes.js";
import adminRouter from "./routes/admin/products-routes.js";

import shopProductsRouter from "./routes/shop/products-routes.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";

import AdminOrderRouter from "./routes/admin/order-routes.js";

import commonFeatureRouter from "./routes/common/feature-routes.js";

dotenv.config();
const PORT = Number(process.env.PORT);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/reviews", shopReviewRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/admin/orders", AdminOrderRouter);
app.use("/api/common/feature", commonFeatureRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running on port ${PORT}`);
});

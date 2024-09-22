import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongoDb from "./DB/connectToMongoDB.js";

import authRouter from './routes/auth/auth-routes.js'
import adminRouter from './routes/admin/products-routes.js'

import AdminOrderRouter from './routes/admin/order-routes.js'

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminRouter);
app.use("/api/admin/orders", AdminOrderRouter)

app.get("/", (req, res) => {
  res.send({ name: "raju" });
});

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running on port ${PORT}`);
});

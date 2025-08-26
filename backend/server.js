import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import globalErrorHandler, { notFound } from "./middlewares/error.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/dashboard/categoryRoutes.js";
import productRoutes from "./routes/dashboard/productRoutes.js";
import sellerRoutes from "./routes/dashboard/sellerRoutes.js";
import cartRoutes from "./routes/home/cartRoutes.js";
import customerRoutes from "./routes/home/customerRoutes.js";
import homeRoutes from "./routes/home/homeRoutes.js";
import orderRoutes from "./routes/order/orderRoutes.js";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies
app.use(
        cors({
                origin: "http://localhost:5173",
                credentials: true,
        })
);

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use(notFound);
app.use(globalErrorHandler);

// Initialize Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});

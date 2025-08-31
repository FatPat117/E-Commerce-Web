import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";

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
const server = http.createServer(app);

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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

// 🔥 Socket.IO init
const io = new Server(server, {
        cors: {
                origin: "*",
                credentials: true,
        },
});

let allCustomer = [];
const addUser = (customerId, userInfo, socketId) => {
        const checkUser = allCustomer.some((user) => user.customerId === customerId);
        if (!checkUser) {
                allCustomer.push({ customerId, userInfo, socketId });
        }
        return allCustomer;
};

io.on("connection", (socket) => {
        socket.on("add_user", (customerId, userInfo) => {
                addUser(customerId, userInfo, socket.id);
        });

        socket.on("disconnect", () => {
                console.log("❌ Client disconnected:", socket.id);
        });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
});

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import globalErrorHandler, { notFound } from "./middlewares/error.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import categoryRoutes from "./routes/dashboard/categoryRoutes.js";
import productRoutes from "./routes/dashboard/productRoutes.js";
import sellerRoutes from "./routes/dashboard/sellerRoutes.js";
import cartRoutes from "./routes/home/cartRoutes.js";
import customerRoutes from "./routes/home/customerRoutes.js";
import homeRoutes from "./routes/home/homeRoutes.js";
import orderRoutes from "./routes/order/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
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
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
        cors({
                origin: function (origin, callback) {
                        if (!origin || allowedOrigins.includes(origin)) {
                                callback(null, true);
                        } else {
                                callback(new Error("Not allowed by CORS"));
                        }
                },
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
app.use("/api/chat", chatRoutes);
app.use("/api/payment", paymentRoutes);

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
let allSeller = [];
let admin = {};

const addUser = (customerId, userInfo, socketId) => {
        const checkUser = allCustomer.some((user) => user.customerId.toString() == customerId.toString());
        if (!checkUser) {
                allCustomer.push({ customerId, userInfo, socketId });
        }
        return allCustomer;
};

const addSeller = (sellerId, sellerInfo, socketId) => {
        const checkSeller = allSeller.some((seller) => seller.sellerId.toString() == sellerId.toString());
        if (!checkSeller) {
                allSeller.push({ sellerId, sellerInfo, socketId });
        }
        return allSeller;
};

const findCustomer = (customerId) => {
        return allCustomer.find((customer) => customer.customerId.toString() == customerId.toString());
};

const findSeller = (sellerId) => {
        return allSeller.find((seller) => seller.sellerId.toString() == sellerId.toString());
};

const remove = (socketId) => {
        allCustomer = allCustomer.filter((customer) => customer.socketId != socketId);
        allSeller = allSeller.filter((seller) => seller.socketId != socketId);
};

io.on("connection", (socket) => {
        socket.on("add_user", (customerId, userInfo) => {
                addUser(customerId, userInfo, socket.id);
                io.emit("activeCustomer", allCustomer);
        });

        socket.on("add_seller", (sellerId, sellerInfo) => {
                addSeller(sellerId, sellerInfo, socket.id);
                io.emit("activeSeller", allSeller);
        });

        socket.on("add_admin", (adminInfo) => {
                if (adminInfo) {
                        delete adminInfo["email"];
                        admin = adminInfo;
                        admin["socketId"] = socket.id;
                        io.emit("activeCustomer", allCustomer);
                        io.emit("activeSeller", allSeller);
                }
        });

        // seller send to customer
        socket.on("send_seller_message", (message) => {
                const customer = findCustomer(message.receiverId);

                if (customer) {
                        socket.to(customer.socketId).emit("seller_message", message);
                }
        });

        // customer send to seller
        socket.on("send_customer_message", (message) => {
                const seller = findSeller(message.receiverId);

                if (seller) {
                        socket.to(seller.socketId).emit("customer_message", message);
                }
        });

        // admin send to seller
        socket.on("send_message_admin_to_seller", (message) => {
                const seller = findSeller(message.receiverId);

                if (seller) {
                        socket.to(seller.socketId).emit("received_admin_message", message);
                }
        });

        // seller to admin
        socket.on("send_message_seller_to_admin", (message) => {
                if (admin) {
                        socket.to(admin.socketId).emit("received_seller_message", message);
                }
        });

        socket.on("disconnect", () => {
                console.log("❌ Client disconnected:", socket.id);
                remove(socket.id);
                io.emit("activeSeller", allSeller);
                io.emit("activeCustomer", allCustomer);
        });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
});

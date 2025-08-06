import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

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

// Initialize Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});

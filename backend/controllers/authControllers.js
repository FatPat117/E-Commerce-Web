import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import createToken from "../utils/tokenCreate.js";
const admin_login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
                throw new ApiError(400, "All fields are required");
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
                throw new ApiError(400, "Email not found");
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
                throw new ApiError(400, "Password is incorrect");
        }

        // Generate token
        const accessToken = createToken({ id: admin._id, role: admin.role });

        const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };

        // Create response
        res.cookie("accessToken", accessToken, cookieOptions);

        res.status(200).json(new ApiResponse(200, "Admin login successful", { token: accessToken }));
});

export default { admin_login };

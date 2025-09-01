import bcrypt from "bcrypt";
import SellerCustomer from "../../models/chat/sellerCustomerModel.js";
import Customer from "../../models/customerModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import createToken from "../../utils/tokenCreate.js";

const customer_register = asyncHandler(async (req, res, next) => {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
                return next(new ApiError(400, "All fields are required"));
        }

        // Find if customer exist
        const existCustomer = await Customer.findOne({ email });
        if (existCustomer) return next(new ApiError(404, "Email has been used"));

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create customer
        const customer = await Customer.create({ email, password: hashedPassword, name, method: "manual" });

        // Create seller customer
        await SellerCustomer.create({ myId: customer._id });

        const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
        };
        const token = createToken({
                id: customer._id,
                name: customer.name,
                email: customer.email,
                method: customer.method,
        });
        res.cookie("customerToken", token, cookieOptions);
        res.status(201).json(new ApiResponse(201, "User register successfully", { customer, token }));
});

const customer_login = asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;

        const existedCustomer = await Customer.findOne({ email }).select("+password");
        if (!existedCustomer) return next(new ApiError(404, "Invalid Email"));

        const isPasswordCorrect = await bcrypt.compare(password, existedCustomer.password);
        if (!isPasswordCorrect) return next(new ApiError(404, "Password is incorrect"));

        const customer = await Customer.findById(existedCustomer._id).select("-password");

        const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
        };
        const token = createToken({
                id: customer._id,
                name: customer.name,
                email: customer.email,
                method: customer.method,
        });
        res.cookie("customerToken", token, cookieOptions);
        res.status(200).json(new ApiResponse(200, "User login successfully", { customer, token }));
});

const customer_logout = asyncHandler(async (req, res, next) => {
        res.clearCookie("customerToken");
        res.status(200).json(new ApiResponse(200, "User logout successfully"));
});

export default {
        customer_register,
        customer_login,
        customer_logout,
};

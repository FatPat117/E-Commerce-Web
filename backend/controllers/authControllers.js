import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import Admin from "../models/adminModel.js";
import sellerCustomer from "../models/chat/sellerCustomerModel.js";
import Seller from "../models/sellerModel.js";
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
        const admin = await Admin.findOne({ email }).select("+password");
        if (!admin) {
                throw new ApiError(400, "Email not found");
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
                throw new ApiError(400, "Password is incorrect");
        }

        // Generate token
        const accessToken = createToken({ _id: admin._id, role: admin.role });

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

const getUser = asyncHandler(async (req, res, next) => {
        const userId = req._id;
        const role = req.role;

        // check if user is logged in
        if (!userId) {
                throw new ApiError(400, "Please login to access this page");
        }

        // check if user is admin
        if (role === "admin") {
                const admin = await Admin.findById(userId).select("-password");
                if (!admin) {
                        throw new ApiError(400, "Admin not found");
                }
                return res.status(200).json(new ApiResponse(200, "", admin));
        }

        // check if user is user
        if (role === "seller") {
                const seller = await Seller.findById(userId).select("-password");
                if (!seller) {
                        throw new ApiError(400, "Seller not found");
                }
                return res.status(200).json(new ApiResponse(200, "", seller));
        }

        throw new ApiError(400, "User not found");
});

const seller_register = asyncHandler(async (req, res, next) => {
        const { name, email, password } = req.body;

        // Check if email , email, password is provided
        if (!email || !password || !name) {
                throw new ApiError(400, "All fields are required");
        }

        // Check if email is already in use
        const seller = await Seller.findOne({ email });
        if (seller) {
                throw new ApiError(409, "Email is already used");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create seller
        const newSeller = await Seller.create({
                name,
                email,
                password: hashedPassword,
                method: "manual",
        });

        // Create seller customer
        await sellerCustomer.create({
                myId: newSeller._id,
        });

        // Create token
        const accessToken = createToken({ _id: newSeller._id, role: newSeller.role });
        const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.status(201).json(new ApiResponse(201, "Seller registered successfully", { newSeller, token: accessToken }));
});

const seller_login = asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;

        // Check if email , email, password is provided
        if (!email || !password) {
                throw new ApiError(400, "All fields are required");
        }

        // Check if Seller is exist
        const seller = await Seller.findOne({ email }).select("+password");
        if (!seller) {
                throw new ApiError(400, "Email not found");
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, seller.password);
        if (!isPasswordCorrect) {
                throw new ApiError(400, "Password is incorrect");
        }

        // Generate token
        const accessToken = createToken({ _id: seller._id, role: seller.role });
        const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.status(200).json(new ApiResponse(200, "Seller login successful", { token: accessToken }));
});

const profile_image_upload = asyncHandler(async (req, res, next) => {
        const id = req._id;
        const seller = await Seller.findById(id);
        if (!seller) throw new ApiError(400, "Seller not found");

        const form = formidable({ multiples: false });
        form.parse(req, async (err, fields, files) => {
                if (err) {
                        throw new ApiError(400, "Failed to parse form data");
                }
                const image = files.image[0];

                cloudinary.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        secure: true,
                });

                // upload to cloudinary
                const result = await cloudinary.uploader.upload(image.filepath, {
                        folder: "profile",
                });
                if (!result) throw new ApiError(400, "Failed to upload image");

                // update seller profile image
                const seller = await Seller.findByIdAndUpdate(
                        id,
                        {
                                image: result.secure_url,
                        },
                        { new: true }
                );
                if (!seller) throw new ApiError(400, "Failed to update seller profile image");
                res.status(200).json(new ApiResponse(200, "Profile image updated successfully", { seller }));
        });
});

export default { admin_login, getUser, seller_register, seller_login, profile_image_upload };

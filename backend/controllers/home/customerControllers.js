import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Customer from "../../models/customerModel.js";
const customer_register = asyncHandler(async (req, res, next) => {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
                return next(new ApiError(400, "All fields are required"));
        }

        // Find if customer exist
        const existCustomer = await Customer.findOne({ email });
        if (existCustomer) return next(new ApiError(400, "Customer already exist"));

        // Create customer
        const customer = await Customer.create({ email, password, name });
        res.status(201).json(new ApiResponse(201, "Customer created successfully", customer));
});
export default {
        customer_register,
};

import Cart from "../../models/cartModel.js";
import Customer from "../../models/customerModel.js";
import Product from "../../models/productModel.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const add_to_cart = asyncHandler(async (req, res, next) => {
        const { userId, productId, quantity } = req.body;

        // Find existed Product
        const existedProduct = await Product.findById(productId);

        if (!existedProduct) {
                return next(new ApiError(404, "Product not found"));
        }

        // Find existed user
        const user = await Customer.findById(userId);

        if (!user) {
                return next(new ApiError(404, "User not found"));
        }

        // Find existed cart
        const existedCart = await Cart.findOne({ userId, productId });

        if (existedCart) {
                return next(new ApiError(400, "Product already in cart"));
        }

        // Create new cart
        const cartProduct = await Cart.create({
                userId,
                productId,
                quantity: parseInt(quantity),
        });
        res.status(201).json(new ApiResponse(201, "Product added to cart", cartProduct));
});

export default {
        add_to_cart,
};

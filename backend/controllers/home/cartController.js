import mongoose from "mongoose";
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

const get_cart_products = asyncHandler(async (req, res, next) => {
        const { userId } = req.params;

        // Get cart products
        const cartProduct = await Cart.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(userId) } },
                {
                        $lookup: {
                                from: "products",
                                localField: "productId",
                                foreignField: "_id",
                                as: "products",
                        },
                },
        ]);

        // Calculate cart products
        let buyProductItem = 0;
        let calculatePrice = 0;
        let cartProductsTotal = 0;

        // Calculate out of stock products
        const outOfStockProducts = cartProduct.filter((item) => item.products[0].stock < item.quantity);

        // Calculate out of stock products total
        for (let i = 0; i < outOfStockProducts.length; i++) {
                cartProductsTotal += outOfStockProducts[i].quantity;
        }

        // Calculate stock products
        const stockProducts = cartProduct.filter((item) => item.products[0].stock >= item.quantity);

        // Calculate stock products
        for (let i = 0; i < stockProducts.length; i++) {
                const { quantity } = stockProducts[i];
                cartProductsTotal = buyProductItem + quantity;
                buyProductItem += quantity;

                const { price, discount } = stockProducts[i].products[0];

                if (discount > 0) {
                        calculatePrice += quantity * (price - Math.floor((price * discount) / 100));
                } else {
                        calculatePrice += quantity * price;
                }
        }
});

export default {
        add_to_cart,
        get_cart_products,
};

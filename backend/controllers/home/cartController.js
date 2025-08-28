import mongoose from "mongoose";
import Cart from "../../models/cartModel.js";
import Customer from "../../models/customerModel.js";
import Product from "../../models/productModel.js";
import Wishlist from "../../models/wishlistModel.js";
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
        const co = 5;

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

        // Out of stock products
        const outOfStockProducts = cartProduct.filter(
                (item) => item.products?.length > 0 && item.products[0].stock < item.quantity
        );
        for (let i = 0; i < outOfStockProducts.length; i++) {
                cartProductsTotal += outOfStockProducts[i].quantity;
        }

        // Stock products
        const stockProducts = cartProduct.filter(
                (item) => item.products?.length > 0 && item.products[0].stock >= item.quantity
        );
        for (let i = 0; i < stockProducts.length; i++) {
                const { quantity } = stockProducts[i];
                buyProductItem += quantity;
                cartProductsTotal += quantity;

                const { price, discount } = stockProducts[i].products[0];
                if (discount > 0) {
                        calculatePrice += quantity * (price - Math.floor((price * discount) / 100));
                } else {
                        calculatePrice += quantity * price;
                }
        }

        // Calculate products from each seller
        let products = [];
        let uniqueSeller = [...new Set(stockProducts.map((product) => product.products[0].sellerId.toString()))];

        for (let i = 0; i < uniqueSeller.length; i++) {
                let price = 0;
                for (let j = 0; j < stockProducts.length; j++) {
                        const tempProduct = stockProducts[j].products[0];

                        if (uniqueSeller[i] === tempProduct.sellerId.toString()) {
                                let pri = 0;
                                if (tempProduct.discount > 0) {
                                        pri =
                                                tempProduct.price -
                                                Math.floor((tempProduct.price * tempProduct.discount) / 100);
                                } else {
                                        pri = tempProduct.price;
                                }
                                pri -= Math.floor((pri * co) / 100);
                                price += pri * stockProducts[j].quantity;

                                products[i] = {
                                        sellerId: uniqueSeller[i],
                                        price: price,
                                        shopName: tempProduct.shopName,
                                        products: products[i]?.products
                                                ? [
                                                          ...products[i].products,
                                                          {
                                                                  _id: stockProducts[j]._id,
                                                                  quantity: stockProducts[j].quantity,
                                                                  productInfo: tempProduct,
                                                          },
                                                  ]
                                                : [
                                                          {
                                                                  _id: stockProducts[j]._id,
                                                                  quantity: stockProducts[j].quantity,
                                                                  productInfo: tempProduct,
                                                          },
                                                  ],
                                };
                        }
                }
        }
        res.status(200).json(
                new ApiResponse(200, "", {
                        cartProducts: products,
                        price: calculatePrice,
                        cartProductsTotal,
                        shippingFee: 100 * products.length,
                        outOfStockProducts,
                        buyProductItem,
                })
        );
});

const delete_cart_product = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        await Cart.findByIdAndDelete(id);
        res.status(200).json(new ApiResponse(200, "Cart product deleted"));
});

const quantity_increment = asyncHandler(async (req, res, next) => {
        const { cartId } = req.params;
        const { quantity } = req.body;
        const product = await Cart.findByIdAndUpdate(cartId, { quantity: quantity }, { new: true });
        res.status(200).json(new ApiResponse(200, "Cart Product increased", product));
});

const quantity_decrement = asyncHandler(async (req, res, next) => {
        const { cartId } = req.params;
        const { quantity } = req.body;
        const product = await Cart.findByIdAndUpdate(cartId, { quantity: quantity }, { new: true });
        res.status(200).json(new ApiResponse(200, "Cart Product decreased", product));
});

const add_to_wishlist = asyncHandler(async (req, res, next) => {
        const { userId, productId, name, price, image, discount, rating, slug } = req.body;
        const existedWishlist = await Wishlist.findOne({ $or: [{ userId, productId }, { slug }] });
        if (existedWishlist) {
                return next(new ApiError(400, "Product already in wishlist"));
        }
        const wishlist = await Wishlist.create({ userId, productId, name, price, image, discount, rating, slug });
        res.status(201).json(new ApiResponse(201, "Product added to wishlist", wishlist));
});

const get_wishlist_products = asyncHandler(async (req, res, next) => {
        const { userId } = req.params;

        const wishlistProducts = await Wishlist.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(userId) } },
                {
                        $lookup: {
                                from: "products",
                                localField: "productId",
                                foreignField: "_id",
                                as: "product",
                                pipeline: [
                                        {
                                                $project: {
                                                        _id: 1,
                                                        name: 1,
                                                        price: 1,
                                                        image: 1,
                                                        slug: 1,
                                                        discount: 1,
                                                        rating: 1,
                                                },
                                        },
                                ],
                        },
                },
                {
                        $unwind: {
                                path: "$product",
                                preserveNullAndEmptyArrays: true, // nếu có wishlist mà sản phẩm đã bị xóa thì vẫn giữ lại
                        },
                },
        ]);

        if (wishlistProducts.length == 0) return next(new ApiError(404, "Wishlist is empty"));
        res.status(200).json(
                new ApiResponse(200, "", {
                        wishlistProductsTotal: wishlistProducts.length,
                        wishlistProducts,
                })
        );
});

const remove_wishlist_product = asyncHandler(async (req, res, next) => {
        const { wishlistId } = req.params;
        const wishlistProduct = await Wishlist.findByIdAndDelete(wishlistId);
        res.status(200).json(new ApiResponse(200, "Wishlist product removed", { wishlistProduct }));
});

export default {
        add_to_cart,
        get_cart_products,
        delete_cart_product,
        quantity_increment,
        quantity_decrement,
        add_to_wishlist,
        get_wishlist_products,
        remove_wishlist_product,
};

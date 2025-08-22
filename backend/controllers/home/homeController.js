import Category from "../../models/categoryModel.js";
import Product from "../../models/productModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
const formateProduct = (products) => {
        const productArray = [];
        let i = 0;
        while (i < products.length) {
                let tmp = [];
                let j = i;
                while (j < i + 3) {
                        if (products[j]) tmp.push(products[j]);
                        j++;
                }
                productArray.push(tmp);
                i = j;
        }
        return productArray;
};

const get_categories = asyncHandler(async (req, res, next) => {
        const categories = await Category.find({});

        if (categories) {
                res.status(200).json(new ApiResponse(200, "", categories));
        } else {
                next(new ApiError(404, "No categories found"));
        }
});

const get_products = asyncHandler(async (req, res, next) => {
        const products = await Product.find({}).limit(12).sort({ createdAt: -1 });
        const allProductsLatest = await Product.find({}).limit(9).sort({ createdAt: -1 });
        const allProductsRating = await Product.find({}).limit(9).sort({ rating: -1 });
        const allProductsDiscount = await Product.find({}).limit(9).sort({ discount: -1 });

        const latestProduct = formateProduct(allProductsLatest);
        const ratingProduct = formateProduct(allProductsRating);
        const discountProduct = formateProduct(allProductsDiscount);

        if (products) {
                res.status(200).json(
                        new ApiResponse(200, "", {
                                products,
                                latestProduct,
                                ratingProduct,
                                discountProduct,
                        })
                );
        } else {
                next(new ApiError(404, "No products found"));
        }
});

export default {
        get_categories,
        get_products,
};

import Category from "../../models/categoryModel.js";
import Product from "../../models/productModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import QueryProducts from "../../utils/queryProducts.js";
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

const price_range_latest_product = asyncHandler(async (req, res, next) => {
        const priceRange = {
                low: 0,
                high: 0,
        };

        const products = await Product.find({}).limit(9).sort({ createdAt: -1 });
        const latestProduct = formateProduct(products);

        const priceProducts = await Product.find({}).sort({ price: 1 });

        if (priceProducts.length > 0) {
                priceRange.low = priceProducts[0].price;
                priceRange.high = priceProducts[priceProducts.length - 1].price;
        }

        if (products) {
                res.status(200).json(new ApiResponse(200, "", { priceRange, latestProduct }));
        } else {
                next(new ApiError(404, "No products found"));
        }
});

const query_products = asyncHandler(async (req, res, next) => {
        const query = { ...req.query, perPage: 2 };

        // const { category, rating, sortByPrice, lowPrice, highPrice, pageNumber } = req.query;

        const pros = await Product.find({}).sort({ createdAt: -1 });
        const products = new QueryProducts(query, pros)
                .categoryQuery()
                .ratingQuery()
                .priceQuery()
                .sortByPriceQuery()
                .searchQuery()
                .skipQuery()
                .limitQuery()
                .getProducts();

        const totalProducts = new QueryProducts(query, pros)
                .categoryQuery()
                .ratingQuery()
                .priceQuery()
                .sortByPriceQuery()
                .searchQuery()
                .getTotalProducts();

        res.status(200).json(new ApiResponse(200, "", { products, totalProducts, perPage: parseInt(query.perPage) }));
});

const product_details = asyncHandler(async (req, res, next) => {
        const { slug } = req.params;

        // find product by slug
        const product = await Product.findOne({ slug });

        // find related product by category
        const relatedProduct = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(12);

        // Find product from the same seller
        const moreProducts = await Product.find({ sellerId: product.sellerId, _id: { $ne: product._id } }).limit(3);

        if (!product) {
                next(new ApiError(404, "Product not found"));
        }

        res.status(200).json(new ApiResponse(200, "", { product, relatedProduct, moreProducts }));
});

export default {
        get_categories,
        get_products,
        price_range_latest_product,
        query_products,
        product_details,
};

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
        {
                sellerId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: [true, "Seller id is required"],
                },
                name: {
                        type: String,
                        required: [true, "Product name is required"],
                },
                brand: {
                        type: String,
                        required: [true, "Brand is required"],
                },
                category: {
                        type: String,
                        required: [true, "Category is required"],
                },
                stock: {
                        type: Number,
                        required: [true, "Stock is required"],
                },
                price: {
                        type: Number,
                        required: [true, "Price is required"],
                },
                discount: {
                        type: Number,
                        required: [true, "Discount is required"],
                },
                description: {
                        type: String,
                        required: [true, "Description is required"],
                },
                images: {
                        type: [String],
                        required: [true, "Images are required"],
                },
                shopName: {
                        type: String,
                        required: [true, "Shop name is required"],
                },
                slug: {
                        type: String,
                        required: true,
                },
                rating: {
                        type: Number,
                        default: 0,
                },
        },
        { timestamps: true }
);

productSchema.index(
        { name: "text", category: "text", brand: "text", description: "text" },
        {
                weights: {
                        name: 5,
                        category: 3,
                        brand: 2,
                        description: 1,
                },
        }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

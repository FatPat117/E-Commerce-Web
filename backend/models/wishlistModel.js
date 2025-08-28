import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
        {
                userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Customer",
                        required: [true, "User id is required"],
                },
                productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: [true, "Product id is required"],
                },
                name: {
                        type: String,
                        required: true,
                },
                price: {
                        type: Number,
                        required: true,
                },
                slug: {
                        type: String,
                        required: true,
                },
                discount: {
                        type: Number,
                },
                rating: {
                        type: Number,
                        default: 0,
                },
                image: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;

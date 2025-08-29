import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
        {
                productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: [true, "Product is required"],
                },
                customerName: {
                        type: String,
                        required: [true, "Name is required"],
                },
                rating: {
                        type: Number,
                        default: 0,
                },
                review: {
                        type: String,
                },
                date: {
                        type: String,
                        default: Date.now(),
                },
        },
        { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;

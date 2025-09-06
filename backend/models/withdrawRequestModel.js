import mongoose from "mongoose";

const WithDrawRequestSchema = new mongoose.Schema(
        {
                sellerId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Seller",
                        required: true,
                },
                amount: {
                        type: Number,
                        required: true,
                },
                status: {
                        type: String,
                        default: "pending",
                },
        },
        { timestamps: true }
);

const WithDrawRequest = mongoose.model("WithDrawRequest", WithDrawRequestSchema);

export default WithDrawRequest;

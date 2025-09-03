import mongoose from "mongoose";

const stripeSchema = new mongoose.Schema(
        {
                sellerId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Seller",
                        required: true,
                },
                stripeId: {
                        type: String,
                        required: true,
                },
                code: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

const StripeModel = mongoose.model("StripeModel", stripeSchema);

export default StripeModel;

import mongoose from "mongoose";

const sellerWalletSchema = new mongoose.Schema(
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
                month: {
                        type: Number,
                        required: true,
                },
                year: {
                        type: Number,
                        required: true,
                },
        },
        { timestamps: true }
);

const SellerWallet = mongoose.model("SellerWallet", sellerWalletSchema);

export default SellerWallet;

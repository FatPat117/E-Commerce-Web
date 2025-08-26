import mongoose from "mongoose";

const authOrderSchema = new mongoose.Schema(
        {
                orderId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "CustomerOrder",
                        required: true,
                },
                sellerId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Seller",
                        required: true,
                },
                products: {
                        type: Array,
                        required: true,
                },
                price: { type: Number, required: true },
                paymentStatus: {
                        type: String,
                        required: true,
                },
                deliveryStatus: {
                        type: String,
                        required: true,
                },
                shippingInfo: {
                        type: Object,
                        required: true,
                },
                date: {
                        type: String,
                        required,
                },
        },
        { timestamps: true }
);

const AuthOrder = mongoose.model("AuthOrder", authOrderSchema);

export default AuthOrder;

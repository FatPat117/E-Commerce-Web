import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
        {
                userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: [true, "User is required"],
                },

                productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        requied: [true, "Product is required"],
                },
                quantity: {
                        type: Number,
                        required: [true, "Quantity is required"],
                },
        },
        { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

import mongoose from "mongoose";

const sellerCustomerMessageSchema = new mongoose.Schema(
        {
                senderName: {
                        type: String,
                        required: true,
                },
                sendedId: {
                        type: String,
                        required: true,
                },
                receiverId: {
                        type: String,
                        required: true,
                },
                message: {
                        type: String,
                        required: true,
                },
                status: {
                        type: String,
                        default: "unseen",
                },
        },
        { timestamps: true }
);

const SellerCustomerMessage = mongoose.model("seller_customers_messages", sellerCustomerMessageSchema);

export default SellerCustomerMessage;

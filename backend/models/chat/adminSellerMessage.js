import mongoose from "mongoose";

const adminSellerMessageSchema = new mongoose.Schema(
        {
                senderName: {
                        type: String,
                        required: true,
                },
                senderId: {
                        type: String,
                        default: "admin",
                },
                receiverId: {
                        type: String,
                        default: "",
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

const AdminSellerMessage = mongoose.model("admin_seller_messages", adminSellerMessageSchema);

export default AdminSellerMessage;

import mongoose from "mongoose";

const sellerCustomerSchema = new mongoose.Schema(
        {
                myId: {
                        type: String,
                        required: true,
                },
                myFriends: {
                        type: Array,
                        default: [],
                },
        },
        { timestamps: true }
);

const Admin = mongoose.model("seller_customers", sellerCustomerSchema);

export default Admin;

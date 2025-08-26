import mongoose from "mongoose";

const customerOrderSchema = new mongoose.Schema(
        {
                customerId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: [true, "Customer ID is required"],
                        ref: "Customer",
                },
                products: {
                        type: Array,
                        required: true,
                },
                price: {
                        type: Number,
                        required: true,
                },
                paymentStatus: {
                        type: String,
                        required: true,
                },
                shippingInfo: {
                        type: Object,
                        required: true,
                },
                deliveryStatus: {
                        type: String,
                        required: true,
                },
                date: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

const CustomerOrder = mongoose.model("CustomerOrder", customerOrderSchema);

export default CustomerOrder;

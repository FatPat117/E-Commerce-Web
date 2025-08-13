import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: [true, "Name is required"],
                },
                email: {
                        type: String,
                        required: [true, "Email is required"],
                        unique: true,
                        trim: true,
                        index: true,
                },
                password: {
                        type: String,
                        required: [true, "Password is required"],
                        select: false,
                },
                role: {
                        type: String,
                        default: "seller",
                },
                status: {
                        type: String,
                        default: "pending",
                },
                payment: {
                        type: String,
                        default: "inactive",
                },
                method: {
                        type: String,
                        required: [true, "LogMethod is required"],
                },
                image: {
                        type: String,
                        default: "",
                },
                showInfo: {
                        type: Object,
                        default: {},
                },
        },
        { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;

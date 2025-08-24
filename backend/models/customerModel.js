import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
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
                method: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;

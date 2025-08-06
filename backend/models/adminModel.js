import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
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
                },
                image: {
                        type: String,
                        required: [true, "Image is required"],
                },
                role: {
                        type: String,
                        default: "admin",
                },
        },
        { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
        {
                name: {
                        type: String,
                        required: [true, "Category name is required"],
                },
                image: {
                        type: String,
                        required: [true, "Category image is required"],
                },
                slug: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

categorySchema.index({ name: "text" });

const Category = mongoose.model("Category", categorySchema);

export default Category;
